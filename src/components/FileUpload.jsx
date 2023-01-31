import React, {ChangeEvent, useRef, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom"
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
  }
  
from 'mdb-react-ui-kit';;

export function FileUpload(){
        
    const [selectedFile, setSelectedFile] = useState({})
    
    const handleInputChange = async (event) => {
        setSelectedFile(event.target.files[0])
        
    }

    const Handlesubmit = async (e) => {
    
        const data = new FormData() 
        data.append('file', selectedFile)
        let url = "http://localhost:5000/upload";
        const response = axios.post(url, data, { // receive two parameter endpoint url ,form data 
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => { // then print response status
            console.log("good")
        })
        console.log('File Uploaded');
    }
 
    return(            
        <>
        <div className = "Upload" style = {{display : "flex" , justifyContent : "center"}}s>
            <div className="row">
                <div className="col-md-auto">
                    <MDBCardBody className='px-5'>
                                <h2 style= {{marginTop: "2rem"}} className="text-uppercase text-center mb-5">Selecciona un archivo :</h2>
                                <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} />

                        <div className="form-row">
                            <div>
                                <button style= {{marginTop: "1rem" , marginBottom: "1rem"}} type="submit" className="btn btn-dark" onClick={Handlesubmit}>Save</button>
                            </div>
                                <Link to = "/uploaded">
                                    <button style= {{marginTop: "1rem" , marginBottom: "1rem"}} type="submit" className="btn btn-dark">Ver tabla</button>
                                </Link>
                        </div>
                    </MDBCardBody>
                </div>
            </div>
        </div>
        </>
    )  
}
export default FileUpload;