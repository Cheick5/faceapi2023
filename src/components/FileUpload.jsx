import React, {useRef, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom"


import {
    
    MDBCardBody,
  }
  
from 'mdb-react-ui-kit';;

export function FileUpload(){

    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    //Lista de las personas
    const [listPersonId, setListPersonId] = useState([]);
    const [listGroupId, setListGroupId] = useState([]);

    //Group, person and image seleccionados 
    const [groupId, setGroupId] = useState();
    const [personId, setPersonId] = useState();
    const [selectedFile, setSelectedFile] = useState({})
    
    //cambios de las opciones seleccionadas
    const handleInputChange = async (event) => {
        setSelectedFile(event.target.files[0])
        
    }

    //llama a la api para guardar los grupos en una lista
    const handleSelectGroup = async (e) => {
        console.log("dropdown group id")
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5000/get_list_person_groups',  
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setListGroupId(response.data);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
          }
          console.log(errMsg)
        }
    //llama a la api para guardar en una lista las personas del grupo seleccionado
    //TODO: hay que poner el grupo seleccionado como argumento en la peticion a la api
    const handleSelectPerson = async (e) => {
        console.log("dropdown person id")
        console.log("wena asdfjaosdj" + groupId)
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/get_list_person_id', 
                { "groupid": groupId  },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log('response');
            console.log(response);
            setListPersonId(response.data);
            console.log(listPersonId);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            }
    
        }

    //guarda la foto en la persona seleccionada
    const Handlesubmit = async (e) => {
        console.log(groupId);
        console.log(personId);
        const data = new FormData() 
        data.append('groupid', groupId)
        data.append('personid', personId)
        data.append('file', selectedFile)
        let url = "http://localhost:5000/upload";
        const response = axios.post(url, data, { // receive two parameter endpoint url ,form data 
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => { // then print response status
            console.log("good")
            console.log('res', res);
        })
        console.log('File Uploaded');
    }
 
    return(            
        <>
        <div className = "Upload" style = {{display : "flex" , justifyContent : "center"}}s>
            <div className="row">
                <div className="col-md-auto">
                    <MDBCardBody className='px-5'>
                        <div className="input-group">
                            <label className="input-label">
                                Group ID:
                            </label>
                            <select className="input-select"onClick = {handleSelectGroup} value={groupId} onChange={(e) => setGroupId(e.target.value)}>
                            <option value=""> -- Ej: Presidentes -- </option>
                            {listGroupId.map((item) => (
                                <option key={item} value={item}>
                                {item}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label className="input-label">
                            Person ID:
                            </label>
                            <select className="input-select"  onClick = {handleSelectPerson} value={personId} onChange={(e) => setPersonId(e.target.value)}>
                            <option value=""> -- Ej: 13289123809 -- </option>

                            {listPersonId.map((e,key) => {
                                return <option key={key} value={e}> {e} </option>
                            })}
                            </select>
                        </div>
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