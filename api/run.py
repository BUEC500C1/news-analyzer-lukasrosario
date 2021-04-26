from flask import Blueprint
from flask_restful import Api
from resources.auth_api import LoginAPI, SignupAPI, RefreshAPI
from resources.file_api import FileAPI, SearchAPI, ImportAPI
from resources.text_api import TextAPI


api_bp = Blueprint("api", __name__)
api = Api(api_bp)


api.add_resource(LoginAPI, "/v1/login")
api.add_resource(SignupAPI, "/v1/signup")
api.add_resource(RefreshAPI, "/v1/refresh")
api.add_resource(FileAPI, "/v1/file", "/v1/file/<id>")
api.add_resource(SearchAPI, "/v1/search/<search_term>")
api.add_resource(TextAPI, "/v1/text")
api.add_resource(ImportAPI, "/v1/import")
