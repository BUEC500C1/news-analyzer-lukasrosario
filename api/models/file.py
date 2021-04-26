import flask_sqlalchemy
from uuid import uuid4
import datetime
from extensions import db


class File(db.Model):
    id = db.Column(db.Text, primary_key=True, default=uuid4)
    user_id = db.Column(db.Text, db.ForeignKey("user.id"), nullable=False)
    title = db.Column(db.Text)
    file_url = db.Column(db.Text)
    preview_url = db.Column(db.Text)
    created = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    texts = db.relationship("Text", backref="file")

    @classmethod
    def get_all_files(cls, user_id):
        files = cls.query.filter_by(user_id=user_id).order_by(cls.created.desc()).all()
        return [
            {
                "id": file.id,
                "userId": file.user_id,
                "title": file.title,
                "previewUrl": file.preview_url,
                "created": file.created.strftime("%Y-%m-%d %H:%M:%S"),
            }
            for file in files
        ]

    @classmethod
    def get_file(cls, id):
        file = cls.query.filter_by(id=id).one()
        return {"url": file.file_url, "title": file.title}

    # @classmethod
    # def list_all(cls, id):
    #     return cls.query.filter_by(user_id=id).order_by(File.created).all()
