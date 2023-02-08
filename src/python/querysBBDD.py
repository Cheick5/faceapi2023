import pyodbc
from constantes import *

server = SERVER
database = DATABASE
username = USERNAME
password = PASSWORD   
driver= '{ODBC Driver 18 for SQL Server}' #DESCARGAR EN https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16#download-for-windows



def connect():
    cnxn = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+server+';DATABASE='+database+';ENCRYPT=yes;UID='+username+';PWD='+ password)
    cursor = cnxn.cursor()
    return cursor

def select_all_person():
    cursor = connect()
    cursor.execute("SELECT * from Person") 
    row = cursor.fetchone()
    lista = []
    while row: 
        lista.append(list(row))
        row = cursor.fetchone()
    return lista


def select_all_course():
    cursor = connect()
    cursor.execute("SELECT * from Course") 
    row = cursor.fetchone()
    lista = []
    while row: 
        lista.append(list(row))
        row = cursor.fetchone()
    return lista

def insert_person(PersonId, First_Name,Last_Name,Rut,Person_Group):
    cursor = connect()
    cursor.execute("INSERT INTO Person (Person_Id, First_Name, Last_Name, Rut, Person_Group) VALUES (?,?,?,?,?)", PersonId, First_Name,Last_Name,Rut,Person_Group)
    cursor.commit()
    print("insertado")

def insert_course(Name,Year,Semester,Short_Name):
    cursor = connect()
    cursor.execute("INSERT INTO Course (Name,Year,Semester,Short_Name) VALUES (?,?,?,?)", Name,Year,Semester,Short_Name)
    cursor.commit()
    print("insertado")
    return {"funciona": "si"}


def delete_person(PersonId):
    cursor = connect()
    cursor.execute("DELETE FROM Person WHERE Person_Id = ?", (PersonId,))
    cursor.commit()
    print("Persona borrada")

def insert_enrolment(Person_Id,Course_Id):
    cursor = connect()
    cursor.execute("INSERT INTO Enrolment (Person_Id, Course_Id) VALUES (?, ?)", (Person_Id, Course_Id))
    cursor.commit()
    print(f"insertado persona con person id {Person_Id} en curso con id {Course_Id}")
    return {"funciona": "si"}

if __name__ == "__main__":
    select_all_person()

# with pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password) as conn:
#     with conn.cursor() as cursor:
#         cursor.execute("SELECT * from Person")
#         row = cursor.fetchone()
#         while row:
#             print (str(row[0]) + " " + str(row[1]))
#             row = cursor.fetchone()