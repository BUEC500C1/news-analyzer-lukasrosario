import flask_sqlalchemy
from uuid import uuid4
from extensions import db
import requests


class Text(db.Model):
    id = db.Column(db.Text, primary_key=True, default=uuid4)
    file_id = db.Column(db.Text, db.ForeignKey("file.id"), nullable=False)
    text_url = db.Column(db.Text)

    @classmethod
    def get_text(cls, file_id):
        text = cls.query.filter_by(file_id=file_id).one_or_none()
        if text:
            r = requests.get(text.text_url)
            return r.json()
        else:
            return None
