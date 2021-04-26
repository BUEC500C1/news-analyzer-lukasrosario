import flask_praetorian
from flask import request, jsonify
from flask_restful import Resource
from extensions import guard, db, storage_client, news_client
from uuid import uuid4
from models.file import File
from werkzeug.utils import secure_filename
import fitz
import weasyprint


bucket_name = "ec500-news-analyzer"


class FileAPI(Resource):
    @flask_praetorian.auth_required
    def post(self):
        try:
            current_user = flask_praetorian.current_user()

            article_title = request.form["title"]
            article_file = request.files["file"]
            article_id = str(uuid4())
            article_filename = secure_filename(f"{article_id}.pdf")

            article_path = f"/tmp/{article_filename}"
            article_file.save(article_path)
            artice_doc = fitz.open(article_path)
            preview_page = artice_doc.load_page(0)
            preview_pixmap = preview_page.get_pixmap()
            preview_filename = secure_filename(f"{article_id}.png")
            preview_path = f"/tmp/{preview_filename}"
            preview_image = open(preview_path, "w")
            artice_preview = preview_pixmap.writePNG(preview_path)

            storage_client.upload_file(
                Filename=article_path,
                Bucket=bucket_name,
                Key=article_filename,
            )
            storage_client.upload_file(
                Filename=preview_path, Bucket=bucket_name, Key=preview_filename
            )

            article = File(
                title=article_title,
                user_id=current_user.id,
                file_url=f"https://ec500-news-analyzer.s3.us-east-2.amazonaws.com/{article_filename}",
                preview_url=f"https://ec500-news-analyzer.s3.us-east-2.amazonaws.com/{preview_filename}",
            )
            db.session.add(article)
            db.session.commit()

            ret = {"message": "OK"}
            return ret, 200

        except Exception as e:
            print(e)
            ret = {"message": "Server Error"}
            return ret, 500

        ret = {"message": "Error"}
        return ret, 400

    @flask_praetorian.auth_required
    def get(self, id=None):
        if id is not None:
            file = File.get_file(id)
            return file, 200
        else:
            try:
                current_user = flask_praetorian.current_user()
                files = File.get_all_files(current_user.id)
                ret = {"files": files}
                return ret, 200
            except Exception as e:
                print(e)
                return 500
        ret = {"message": "Error"}
        return ret, 400


class ImportAPI(Resource):
    @flask_praetorian.auth_required
    def post(self):
        try:
            current_user = flask_praetorian.current_user()

            data = request.get_json()

            article_title = data["title"]
            article_url = data["fileUrl"]
            article_id = str(uuid4())
            article_filename = secure_filename(f"{article_id}.pdf")

            article_path = f"/tmp/{article_filename}"
            pdf = weasyprint.HTML(article_url).write_pdf()
            open(article_path, "wb").write(pdf)

            artice_doc = fitz.open(article_path)
            preview_page = artice_doc.load_page(0)
            preview_pixmap = preview_page.get_pixmap()
            preview_filename = secure_filename(f"{article_id}.png")
            preview_path = f"/tmp/{preview_filename}"
            preview_image = open(preview_path, "w")
            artice_preview = preview_pixmap.writePNG(preview_path)

            storage_client.upload_file(
                Filename=article_path,
                Bucket=bucket_name,
                Key=article_filename,
            )
            storage_client.upload_file(
                Filename=preview_path, Bucket=bucket_name, Key=preview_filename
            )

            article = File(
                title=article_title,
                user_id=current_user.id,
                file_url=f"https://ec500-news-analyzer.s3.us-east-2.amazonaws.com/{article_filename}",
                preview_url=f"https://ec500-news-analyzer.s3.us-east-2.amazonaws.com/{preview_filename}",
            )
            db.session.add(article)
            db.session.commit()

            ret = {"message": "OK"}
            return ret, 200

        except Exception as e:
            print(e)
            ret = {"message": "Server Error"}
            return ret, 500

        ret = {"message": "Error"}
        return ret, 400


class SearchAPI(Resource):
    def get(self, search_term=None):
        top_headlines = news_client.get_everything(
            q=search_term, language="en", sort_by="relevancy", page_size=20
        )
        articles = top_headlines["articles"]
        articles = [
            {
                "title": article["title"],
                "fileUrl": article["url"],
                "previewUrl": article["urlToImage"],
            }
            for article in articles
        ]
        ret = {"articles": articles}
        return ret, 200