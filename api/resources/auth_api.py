from flask import request
from flask_restful import Resource
from extensions import guard


class SignupAPI(Resource):
    def post(self):
        req = request.get_json(force=True)
        email = req.get('email', None)
        password = req.get('password', None)
        print(email, password)
        user = User(
            email=email,
            password=guard.hash_password(password),
            roles='user'
        )
        db.session.add(user)
        db.session.commit()
        user = guard.authenticate(email, password)
        ret = {'access_token': guard.encode_jwt_token(user)}
        return ret, 200


class LoginAPI(Resource):
    def post(self):
        req = request.get_json(force=True)
        email = req.get('email', None)
        password = req.get('password', None)
        user = guard.authenticate(email, password)
        ret = {'access_token': guard.encode_jwt_token(user)}
        return ret, 200


class RefreshAPI(Resource):
    def post(self):
        old_token = request.get_data()
        new_token = guard.refresh_jwt_token(old_token)
        ret = {'access_token': new_token}
        return ret, 200 