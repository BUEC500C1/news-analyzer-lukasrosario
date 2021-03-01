import flask_sqlalchemy
from uuid import uuid4


db = flask_sqlalchemy.SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Text, primary_key=True, default=uuid4)
    email = db.Column(db.Text, unique=True)
    password = db.Column(db.Text)
    roles = db.Column(db.Text)

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

    @classmethod
    def lookup(cls, email):
        return cls.query.filter_by(email=email).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id