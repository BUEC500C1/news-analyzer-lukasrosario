import flask_praetorian
from flask import request, jsonify
from flask_restful import Resource
from extensions import guard, db, storage_client, openai
from uuid import uuid4
from models.file import File
from models.text import Text
from werkzeug.utils import secure_filename
import requests
import pdfplumber
import os
import string
import json


bucket_name = "ec500-news-analyzer"


class TextAPI(Resource):
    @flask_praetorian.auth_required
    def post(self):
        try:
            data = request.get_json()

            file_id = data["fileId"]
            text = Text.get_text(file_id)

            if text:
                return text, 200

            file_url = File.get_file(file_id)["url"]
            file_filename = secure_filename(f"{file_id}.pdf")
            file_path = f"/tmp/{file_filename}"

            file_content = requests.get(file_url).content
            with open(file_path, "wb") as f:
                f.write(file_content)

            text_id = str(uuid4)
            text_filename = secure_filename(f"{text_id}.json")
            text_path = f"/tmp/{text_filename}"

            all_text = ""
            with pdfplumber.open(file_path) as pdf:
                for pdf_page in pdf.pages:
                    single_page_text = pdf_page.extract_text()
                    all_text = all_text + "\n" + single_page_text

            summary_prompt = all_text[:2041] + "\ntl;dr:"
            response = openai.Completion.create(
                engine="ada",
                prompt=summary_prompt,
                temperature=0,
                max_tokens=120,
                top_p=1.0,
                frequency_penalty=0.8,
                presence_penalty=0.0,
            )
            summary = response["choices"][0]["text"].replace("\n", " ")

            printable = set(string.printable)
            all_text = "".join(filter(lambda x: x in printable, all_text))

            keywords_prompt = all_text[:2036] + "\n\nKeywords:"
            response = openai.Completion.create(
                engine="curie",
                prompt=keywords_prompt,
                temperature=0.0,
                max_tokens=60,
                top_p=1.0,
                frequency_penalty=0.8,
                presence_penalty=0.0,
                stop=["Keywords:"],
            )
            keywords = response["choices"][0]["text"].replace("\n", " ")
            keywords = [word.strip() for word in keywords.split(",")]

            text_content = {"summary": summary, "keywords": keywords}

            with open(text_path, "w") as f:
                json.dump(text_content, f)

            storage_client.upload_file(
                Filename=text_path,
                Bucket=bucket_name,
                Key=text_filename,
            )

            text = Text(
                file_id=file_id,
                text_url=f"https://ec500-news-analyzer.s3.us-east-2.amazonaws.com/{text_filename}",
            )
            db.session.add(text)
            db.session.commit()

            ret = text_content
            return ret, 200

        except Exception as e:
            print(e)
            ret = {"message": "Server Error"}
            return ret, 500

        ret = {"message": "Error"}
        return ret, 400
