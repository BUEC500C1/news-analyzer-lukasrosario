import flask_praetorian
import flask_sqlalchemy

guard = flask_praetorian.Praetorian()
db = flask_sqlalchemy.SQLAlchemy()