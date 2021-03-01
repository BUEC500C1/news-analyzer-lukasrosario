from flask import Blueprint
from flask_restful import Api
from resources.auth_api import LoginAPI


api_bp = Blueprint('api', __name__)
api = Api(api_bp)


api.add_resource(LoginAPI, '/v1/login') 