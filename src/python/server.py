from flask import Flask, request
from flask_cors import CORS, cross_origin
from locallib import *
#from constantes import *
from pprint import pprint

KEY = "41528c18743e46b490b623815dc31ecf"
ENDPOINT = "https://asistencia2023.cognitiveservices.azure.com"

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'

@app.route('/post_create_person_group',methods = ['POST', 'GET'])
    #NOW we get the post request from the client
def post_create_person_group():
    if request.method == 'POST':
        data = request.json
        pprint(vars(request))
        porfa = create_person_group(data['groupid'])
        return {"funciona": "si"}
    else:
        return("no post")

@app.route('/get_list_person_groups',methods = ['POST', 'GET'])
def get_list_person_groups():
    if request.method == 'GET':
        # data = request.json
        porfa = list_person_groups()
        return (porfa)
    else:
        return("no post")

@app.route('/delete_delete_list_persons',methods = ['GET', 'DELETE'])
def delete_delete_list_persons():
    if request.method == 'DELETE':
        print("ola")
        print(request)
        print("pprint :")
        # pprint(vars(request))
        data = request.json
        print("data groupid")
        print(data['groupid'])
        print("ahora viene porfa")
        porfa = delete_person_group(data['groupid'])
        print(porfa)
        return (porfa)
    else:
        return("La request tiene que ser DELETE")

@app.route('/post_create_person',methods = ['POST', 'GET'])
def post_create_person():
    if request.method == 'POST':
        data = request.json
        porfa = create_person(data['groupid'], data['name'])
        return (porfa)
    else:
        return("no post")

# @app.route("/post_photo_to_person", methods=['POST'])
# def post_photo_to_person():
#     if request.method == 'POST':
#         data = request.json
#         pprint(vars(request))
#         porfa = add_person_face(data['groupid'], data['personid'], data['url'])
#         return (porfa)
#     else:
#         return("no post")

if __name__ == '__main__':
    app.run(debug=True)
