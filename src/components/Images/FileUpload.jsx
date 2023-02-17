import React, {useRef, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom"
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import './FileUpload.css'

import {MDBCardBody} from 'mdb-react-ui-kit';;

export function FileUpload(){

    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    const [listPersonId, setListPersonId] = useState([]);
    const [listPersonas, setListPersonas] = useState([])
    const [listGroupId, setListGroupId] = useState([]);
    const [groupId, setGroupId] = useState([]);
    const [personId, setPersonId] = useState();
    const [selectedFile, setSelectedFile] = useState([])
    
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
        const fetchperson = async (e) =>  {
            try {
                const response = await axios.get('http://localhost:5000/get_get_person',  
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                const filtered = response.data.filter(function(x) {
                    return x[4] === e;}
                );
                //We trim index 1 and 2
                filtered.forEach(function(x) {
                    x[1] = x[1].trim();
                    x[2] = x[2].trim();
                });
                await setListPersonas(filtered);
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 409) {
                    setErrMsg('Username Taken');
                } else {
                    setErrMsg('Registration Failed')
                }
                errRef.current.focus();
            }
        }
        const handleSelectedGroup = async (e) => {
        
            setGroupId(e.target.value);
            fetchperson(e.target.value);
    
        }

    //llama a la api para guardar en una lista las personas del grupo seleccionado
    //TODO: hay que poner el grupo seleccionado como argumento en la peticion a la api
    const handleSelectPerson = async (e) => {
        console.log("dropdown person id")
        console.log("groupId" + groupId)
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
        console.log('personId');
        console.log(personId[0]);
        const data = new FormData() 
        data.append('groupid', groupId)
        data.append('personid', personId[0])
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
        <div className = "app__images-card">
            <div>
                <MDBCardBody className='app__images-card-info'>
                <h1 >Selecciona un Group Id y una Persona</h1>
                    <div className = "app__images-container">

                        <div style={{width : "300px",marginBottom : '2rem'}}>
                            <FormControl fullWidth required>
                            <InputLabel htmlFor="grouped-native-select">GroupId</InputLabel>
                            <Select style = {{color : 'white'}} className="input-select"onOpen = {handleSelectGroup} value={groupId} onChange={(e) => setGroupId(e.target.value)}
                                onChange={(e) => handleSelectedGroup(e)}>
                            <MenuItem disabled value=""> -- Ej: Presidentes -- </MenuItem>
                            {listGroupId.map((item) => (
                                <MenuItem key={item} value={item}>
                                {item}
                                </MenuItem>
                            ))}
                            </Select>
                            </FormControl>
                        </div>
                        <div >

                                <Autocomplete 
                                disablePortal
                                id="combo-box-demo"
                                options={listPersonas}  
                                groupBy={(option) => option[1][0]}
                                // getOptionLabel={(option) => option[1].trim() + " " + option[2].trim()}
                                getOptionLabel={(option) => option[1] + " " + option[2]}
                                sx={{ 
                                    width: { sm: "100%", md: 300 },
                                    "& .MuiAutocomplete-inputRoot .MuiAutocomplete-input": {
                                      color: 'white'
                                    }
                                  }}
                                renderInput={(params) => <TextField {...params} label="Personas" />}
                                onChange={(event: any, newValue: string | null) => {
                                    setPersonId(newValue);
                                }}
                                />
                        </div>
                                <h1 style= {{marginTop: "2rem"}}>Selecciona un archivo :</h1>
                                <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} />

                        <div className="form-row">
                            <div>
                                <button type="submit" className="app__images-button" onClick={Handlesubmit}>Save</button>
                            </div>
                                
                        </div>
                    </div>
                </MDBCardBody>
            </div>
            
        </div>
        </>
    )  
}
export default FileUpload;