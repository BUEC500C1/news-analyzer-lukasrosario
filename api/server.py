from flask import Flask, request
import os
from extensions import guard, db
from uuid import uuid4
from dotenv import load_dotenv, find_dotenv
from models.user import User
from models.file import File
from models.text import Text
import ssl

ssl._create_default_https_context = ssl._create_unverified_context


load_dotenv(find_dotenv())

app = Flask(__name__, static_folder="./build", static_url_path="/")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["JWT_ACCESS_LIFESPAN"] = {"hours": 24}
app.config["JWT_REFRESH_LIFESPAN"] = {"days": 30}


guard.init_app(app, User)
db.init_app(app)

# with app.app_context():
#     db.create_all()


@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")


def load_api():
    from run import api_bp

    app.register_blueprint(api_bp, url_prefix="/api")


if __name__ == "__main__":
    load_api()
    app.run(host="0.0.0.0", debug=True, port=os.environ.get("PORT", 80))
