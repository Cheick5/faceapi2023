from flask import Flask, request
from locallib import *
from constantes import *


app = Flask(__name__)

@app.route('/probando',methods = ['POST', 'GET'])
    #NOW we get the post request from the client
def probando():
    if request.method == 'POST':
        return(request.form['data'])


if __name__ == '__main__':
    app.run(debug=True)
