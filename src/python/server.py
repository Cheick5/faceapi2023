from flask import Flask, flash, request, redirect, url_for, send_file
from flask_cors import CORS, cross_origin
from locallib import *
from constantes import *
from pprint import pprint
from werkzeug.utils import secure_filename
import os
import base64

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'
UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/get_list_person_id',methods = ['POST', 'GET'])
def get_list_person_id():
    try: 
        if request.method == 'POST':
            data = request.json
            porfa = list_person_id(data["groupid"])
            return (porfa)
        else:
            return("no post")
    except Exception as e:
        print(e)
        return {"status": "no ok"}

@app.route('/get_list_person_groups',methods = ['POST', 'GET'])
def get_list_person_groups():
    if request.method == 'GET':
        # data = request.json
        porfa = list_person_groups()
        return (porfa)
    else:
        return("no post")

@app.route('/get_list_person_group_persons',methods = ['POST', 'GET'])
def get_list_person_group_persons():
    if request.method == 'GET':
        data = request.json
        porfa = list_person_group_persons(data['groupid'])
        return (porfa)
    else:
        return("no post")

@app.route('/post_create_person_group',methods = ['POST', 'GET'])
    #NOW we get the post request from the client
def post_create_person_group():
    if request.method == 'POST':
        try:
            data = request.json
            porfa = create_person_group(data['groupid'])
            return {"funciona": "si"}
        except Exception as e:
            print(e)
            return {"funciona": "no"}
    else:
        return("no post")

@app.route('/delete_delete_list_persons',methods = ['GET', 'DELETE'])
def delete_delete_list_persons():
    if request.method == 'DELETE':
        print(request)
        data = request.json
        print(data['groupid'])
        porfa = delete_person_group(data['groupid'])
        print(porfa)
        return (porfa)
    else:
        return("La request tiene que ser DELETE")

@app.route('/delete_persons',methods = ['GET', 'DELETE'])
def delete_persons():
    if request.method == 'DELETE':
        print(request)
        data = request.json
        print(data['groupId'])
        print("este es el person id: ",data['personId'])
        porfa = delete_person_group_person(data['groupId'], data['personId'])
        print(porfa)
        return (porfa)
    else:
        return("La request tiene que ser DELETE")

@app.route('/post_create_person',methods = ['POST', 'GET'])
def post_create_person():
    if request.method == 'POST':
        data = request.json
        porfa = create_person(data['groupid'], data['name'], data['userData'])
        return (porfa)
    else:
        return("no post")

@app.route('/post_create_course',methods = ['POST', 'GET'])
def post_create_course():
    if request.method == 'POST':
        data = request.json
        porfa = insert_course(data['name'], data['year'], data['semester'],data["short_name"])
        return (porfa)
    else:
        return("no post")

@app.route('/get_get_person',methods = ['POST', 'GET'])
def get_person():
    if request.method == 'GET':
        # data = request.json
        porfa = select_all_person()
        return (porfa)
    else:
        return("no post")

@app.route('/get_get_course',methods = ['POST', 'GET'])
def get_course():
    if request.method == 'GET':
        # data = request.json
        porfa = select_all_course()
        print(porfa)
        return (porfa)
    else:
        return("no post")

@app.route('/post_enrol_person',methods = ['POST', 'GET'])
def enrol_person():
    if request.method == 'POST':
        data = request.json
        persona = data["personid"]
        curso = data["courseid"]
        porfa = insert_enrolment(persona, curso)
        print(porfa)
        return (porfa)
    else:
        return("no post")

def allowed_file(filename):     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST', 'GET'])
def post_upload():
    try:
        if request.method in ['POST' , 'GET']:
            
            file = request.files['file']
            data = request.form
            if file.filename == '':
                flash('No selected file')
                return redirect(request.url)
            if file and allowed_file(file.filename):
                #We get the file extension:
                extension = file.filename.rsplit('.', 1)[1].lower()
                print("extension: " + extension)
                #we set the filename to the current time in miliseconds
                filename = str(int(time.time())) + "." + extension
                print("filename: " + filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                #we get the encode64 of the image
                

                PersonGroupID = data['groupid']
                personID = data['personid']
                with open(os.path.join(app.config['UPLOAD_FOLDER'], filename), "rb") as image_file:
                    #Creo que si mandas image_file a la funcion de photo_to_person, no hace falta que lo codifiques a base64
                    # print(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                    # print(image_file)
                    status = photo_to_person(PersonGroupID, personID, os.path.join(app.config['UPLOAD_FOLDER'], filename))
                    print(status["status"])
                    if status["status"] == 'ok':
                        print("Archivo subido con exito")
                    else: 
                        print("File upload failed:", status)
            return {"status": "upload ok"}
        else:
            return("status: no POST/GET")
    except Exception as e:
        print(e)
        return {"status": "no ok"}

@app.route('/post_train_personGroup',methods = ['POST', 'GET'])
    #NOW we get the post request from the client
def post_train_personGroup():
    if request.method == 'POST':
        data = request.json
        pprint(vars(request))
        porfa = train_personGroup(data['groupId'])
        return {"funciona": "si"}
    else:
        return("no post")

@app.route('/post_get_photo_person',methods = ['POST', 'GET'])
def get_photo_person():
    if request.method == 'POST':
        data = request.json
        porfa = select_photo_person(data['personId'])
        for i in porfa:
            # imagen = os.path.join(app.config['UPLOAD_FOLDER'], i[1])
            imagen = open(i[1], "rb").read()
            i.append(base64.b64encode(imagen).decode('utf-8') )
        return (porfa)
    else:
        return("no post")

@app.route('/post_delete_photo_person',methods = ['POST', 'GET'])
def delete_photo_person():
    if request.method == 'POST':
        data = request.json
        porfa = delete_photo(data["groupId"],data["personId"],data['persistId'],data["fileName"])
        print(porfa)
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
    app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
    app.run(debug=True)
