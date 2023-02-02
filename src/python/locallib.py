import asyncio
import io
import os
import sys
import time
import uuid
import requests
from urllib.parse import urlparse
from io import BytesIO
# To install this module, run:
# python -m pip install Pillow
from PIL import Image, ImageDraw
from azure.cognitiveservices.vision.face import FaceClient
from msrest.authentication import CognitiveServicesCredentials
from azure.cognitiveservices.vision.face.models import TrainingStatusType, Person, QualityForRecognition
from constantes import * #kEY1, ENDPOINT, CONFIANZA
import csv
from pprint import pprint

# This key will serve all examples in this document.
KEY = KEY1
# This endpoint will be used in all examples in this quickstart.
ENDPOINT = ENDPOINT

# Base url for the Verify and Facelist/Large Facelist operations
IMAGE_BASE_URL = 'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/Face/images/'

# Used in the Person Group Operations and Delete Person Group examples.
# You can call list_person_groups to print a list of preexisting PersonGroups.
# SOURCE_PERSON_GROUP_ID should be all lowercase and alphanumeric. For example, 'mygroupname' (dashes are OK).
PERSON_GROUP_ID = str(uuid.uuid4()) # assign a random ID (or name it anything), deberia ser un parametro ("presidentes")

# Used for the Delete Person Group example.
TARGET_PERSON_GROUP_ID = str(uuid.uuid4()) # assign a random ID (or name it anything)

from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'

# response.headers.add('', '*')

def list_person_groups():
    '''
    List all PersonGroups
    '''
    try:
        # Create an authenticated FaceClient.
        face_client = FaceClient(ENDPOINT, CognitiveServicesCredentials(KEY)) #FaceClient es una clase que crea un objeto
        # List all Person Groups
        person_groups = face_client.person_group.list() #https://learn.microsoft.com/en-us/rest/api/faceapi/person-group/list?tabs=HTTP
        new_list = []
        for person_group in person_groups:
            new_list.append(person_group.name)
        return(new_list)
    except Exception as e:
        print("Error en list_person_groups")
        print(e)

def list_person_group_persons(GroupID):
    '''
    List all PersonGroups
    '''
    try:
        # Create an authenticated FaceClient.
        face_client = FaceClient(ENDPOINT, CognitiveServicesCredentials(KEY)) #FaceClient es una clase que crea un objeto
        # List all Person Groups
        person_groups = face_client.person_group_person.list(GroupID) #https://learn.microsoft.com/en-us/rest/api/faceapi/person-group/list?tabs=HTTP
        new_list = []
        for person_group in person_groups:
            new_list.append(person_group.name)
        return(new_list)
    except Exception as e:
        print("Error en list_person_group_persons")
        print(e)

def create_person_group(PersonGroupID,userData="",recognition_model = "recognition_04"):
    '''
    Create the PersonGroup
    '''
    try:
        # Create an authenticated FaceClient.
        face_client = FaceClient(ENDPOINT, CognitiveServicesCredentials(KEY)) #FaceClient es una clase que crea un objeto
        # Create empty Person Group. Person Group ID must be lower case, alphanumeric, and/or with '-', '_'.
        print('Person group aaaaaaa:', PersonGroupID)
        face_client.person_group.create(person_group_id=PersonGroupID, name=PersonGroupID, recognition_model=recognition_model,user_data=userData) #https://learn.microsoft.com/en-us/rest/api/faceapi/person-group/create?tabs=HTTP
        # # Define woman friend
        # woman = face_client.person_group_person.create(PersonGroupID, name="Woman") #https://learn.microsoft.com/en-us/rest/api/faceapi/person-group-person/create?tabs=HTTP#person
        # # Define man friend
        # man = face_client.person_group_person.create(PersonGroupID, name="Man") 
        # # Define child friend
        # child = face_client.person_group_person.create(PersonGroupID, name="Child")
        
        file = open("person_groups.csv", "a", newline='')
        writer = csv.writer(file)
        writer.writerow({PersonGroupID})
        file.close()
        return True
    except Exception as e:
        print("Error en create_person_group")
        print(e)


def delete_person_group(PersonGroupID):
    '''
    Delete the PersonGroup
    '''
    try:
        # Create an authenticated FaceClient.
        face_client = FaceClient(ENDPOINT, CognitiveServicesCredentials(KEY)) #FaceClient es una clase que crea un objeto
        # Delete an existing Person Group. Person Group ID must be lower case, alphanumeric, and/or with '-', '_'.
        print('Person group aaaaaaa:', PersonGroupID)
        face_client.person_group.delete(person_group_id=PersonGroupID) #https://learn.microsoft.com/en-us/rest/api/faceapi/person-group/delete?tabs=HTTP
        return {"status": "ok"}
    except Exception as e:
        print("Error en delete_person_group")
        print(e)

def create_person(PersonGroupID, name, userData=""):
    '''
    Create a new person in a specified person group.
    '''
    try:
        # Create an authenticated FaceClient.
        face_client = FaceClient(ENDPOINT, CognitiveServicesCredentials(KEY)) #FaceClient es una clase que crea un objeto
        # Create empty Person Group. Person Group ID must be lower case, alphanumeric, and/or with '-', '_'.
        person = face_client.person_group_person.create(PersonGroupID, name=name,user_data=userData) #https://learn.microsoft.com/en-us/rest/api/faceapi/person-group-person/create?tabs=HTTP#person
        print("Person created: ")
        pprint(person)
        #WE get the person id:
        # personID = person["personId"]
        print("Person ID: ", person.person_id)
        file = open("person.csv", "a", newline='')
        writer = csv.writer(file)
        writer.writerow([name]  + [person.person_id] + [PersonGroupID])
        file.close()
        return {"status": "ok"}
    except Exception as e:
        print("Error en create_person")
        print(e)
        return {"status": "error"}
    
def photo_to_person(PersonGroupID, personID, encoded_image):
    try:
        face_client = FaceClient(ENDPOINT, CognitiveServicesCredentials(KEY)) #FaceClient es una clase que crea un objeto
        person = face_client.person_group_person.add_face_from_stream(PersonGroupID, personID, encoded_image)
        pprint(person)
        return {"status": "ok"}
    except Exception as e:
        print("Error en photo_to_person")
        print(e)




# Detect faces and register them to each person
# '''
# # Find all jpeg images of friends in working directory (TBD pull from web instead)
# woman_images = ["https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/Face/images/Family1-Mom1.jpg", "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/Face/images/Family1-Mom2.jpg"]
# man_images = ["https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/Face/images/Family1-Dad1.jpg", "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/Face/images/Family1-Dad2.jpg"]
# child_images = ["https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/Face/images/Family1-Son1.jpg", "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/Face/images/Family1-Son2.jpg"]

# # Add to woman person
# for image in woman_images:
#     # Check if the image is of sufficent quality for recognition.
#     sufficientQuality = True
#     detected_faces = face_client.face.detect_with_url(url=image, detection_model='detection_03', recognition_model='recognition_04', return_face_attributes=['qualityForRecognition'])
#     for face in detected_faces:
#         if face.face_attributes.quality_for_recognition != QualityForRecognition.high:
#             sufficientQuality = False
#             break
#         face_client.person_group_person.add_face_from_url(PERSON_GROUP_ID, woman.person_id, image)
#         print("face {} added to person {}".format(face.face_id, woman.person_id))

#     if not sufficientQuality: continue

# # Add to man person
# for image in man_images:
#     # Check if the image is of sufficent quality for recognition.
#     sufficientQuality = True
#     detected_faces = face_client.face.detect_with_url(url=image, detection_model='detection_03', recognition_model='recognition_04', return_face_attributes=['qualityForRecognition'])
#     for face in detected_faces:
#         if face.face_attributes.quality_for_recognition != QualityForRecognition.high:
#             sufficientQuality = False
#             break
#         face_client.person_group_person.add_face_from_url(PERSON_GROUP_ID, man.person_id, image)
#         print("face {} added to person {}".format(face.face_id, man.person_id))

#     if not sufficientQuality: continue

# # Add to child person
# for image in child_images:
#     # Check if the image is of sufficent quality for recognition.
#     sufficientQuality = True
#     detected_faces = face_client.face.detect_with_url(url=image, detection_model='detection_03', recognition_model='recognition_04', return_face_attributes=['qualityForRecognition'])
#     for face in detected_faces:
#         if face.face_attributes.quality_for_recognition != QualityForRecognition.high:
#             sufficientQuality = False
#             print("{} has insufficient quality".format(face))
#             break
#         face_client.person_group_person.add_face_from_url(PERSON_GROUP_ID, child.person_id, image)
#         print("face {} added to person {}".format(face.face_id, child.person_id))
#     if not sufficientQuality: continue


# '''
# Train PersonGroup
# '''
# # Train the person group
# print("pg resource is {}".format(PERSON_GROUP_ID))
# rawresponse = face_client.person_group.train(PERSON_GROUP_ID, raw= True)
# print(rawresponse)

# while (True):
#     training_status = face_client.person_group.get_training_status(PERSON_GROUP_ID)
#     print("Training status: {}.".format(training_status.status))
#     print()
#     if (training_status.status is TrainingStatusType.succeeded):
#         break
#     elif (training_status.status is TrainingStatusType.failed):
#         face_client.person_group.delete(person_group_id=PERSON_GROUP_ID)
#         sys.exit('Training the person group has failed.')
#     time.sleep(5)

# '''
# Identify a face against a defined PersonGroup
# '''
# # Group image for testing against
# test_image = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/Face/images/identification1.jpg"

# print('Pausing for 10 seconds to avoid triggering rate limit on free account...')
# time.sleep (10)

# # Detect faces
# face_ids = []
# # We use detection model 3 to get better performance, recognition model 4 to support quality for recognition attribute.
# faces = face_client.face.detect_with_url(test_image, detection_model='detection_03', recognition_model='recognition_04', return_face_attributes=['qualityForRecognition'])
# for face in faces:
#     # Only take the face if it is of sufficient quality.
#     if face.face_attributes.quality_for_recognition == QualityForRecognition.high or face.face_attributes.quality_for_recognition == QualityForRecognition.medium:
#         face_ids.append(face.face_id)

# # Identify faces
# results = face_client.face.identify(face_ids, PERSON_GROUP_ID)
# print('Identifying faces in image')
# if not results:
#     print('No person identified in the person group')
# for identifiedFace in results:
#     if len(identifiedFace.candidates) > 0:
#         print('Person is identified for face ID {} in image, with a confidence of {}.'.format(identifiedFace.face_id, identifiedFace.candidates[0].confidence)) # Get topmost confidence score

#         # Verify faces
#         verify_result = face_client.face.verify_face_to_person(identifiedFace.face_id, identifiedFace.candidates[0].person_id, PERSON_GROUP_ID)
#         print('verification result: {}. confidence: {}'.format(verify_result.is_identical, verify_result.confidence))
#     else:
#         print('No person identified for face ID {} in image.'.format(identifiedFace.face_id))
 

# print()
# print('End of quickstart.')

def main():
    pass

def prueba():
    return("Hola mundo")

if __name__ == '__main__':
    main()
