import React, {useRef, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom"
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import './FileUpload.css';

import {MDBCardBody} from 'mdb-react-ui-kit';;

export function PersonShowImagesTrain(){   const [errMsg, setErrMsg] = useState('');
const errRef = useRef();
const [listPersonId, setListPersonId] = useState([]);
const [listPersonas, setListPersonas] = useState([])
const [listGroupId, setListGroupId] = useState([]);
const [groupId, setGroupId] = useState([]);
const [personId, setPersonId] = useState();
const [selectedFile, setSelectedFile] = useState([])
const [images, setImages] = useState([]);
const [toDelete, setToDelete] = useState("");

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
        // setListPersonId(response.data);
        // console.log(listPersonId);
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
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:5000/post_get_photo_person', 
            {  "personId": personId[0]}    ,
            {
                header: {'Content-Type' : 'application/json'},
            }
        );
        // console.log(JSON.stringify(response?.data));
        // console.log(response?.data);

        console.log('response');
        console.log('response');
        console.log('response');
        console.log('response');
        console.log(response);
        const images = response.data.map(
            encodedImage => encodedImage
          );
        setImages(images);
        // console.log('images');
        // console.log(images);


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

const handleDelete = async (persistId,fileName) => {
    // e.preventDefault();
    console.log(persistId)
    console.log(fileName)
    console.log(groupId)
    console.log(personId[0])

    try {
        const response = await axios.post('http://localhost:5000/post_delete_photo_person', 
            {  "groupId": groupId,"personId" :personId[0] ,"persistId": persistId, "fileName": fileName}    ,

            {
                header: {'Content-Type' : 'application/json'},
            }
        );
        // console.log(JSON.stringify(response?.data));
        // console.log(response?.data);


        console.log('response');
        console.log(response);
        const event = { preventDefault: () => {} };
        const handleSubmission  = () => Handlesubmit(event);
        handleSubmission ();

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

return(            
    <>
    <div className = "app__images-card">
        <div >
            <MDBCardBody className='app__images-card-info'>
            <h1 >Selecciona una Persona para mostrar sus imagenes</h1>
            <div className = "app__images-container">

                <div  style={{width : "300px",margin : '2rem'}}>
                    <FormControl fullWidth required>
                    <InputLabel htmlFor="grouped-native-select">GroupId</InputLabel>
                    <Select className="input-select"onOpen = {handleSelectGroup} value={groupId} onChange={(e) => setGroupId(e.target.value)}
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
                <div className="input-group">

                        <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={listPersonas}  
                        groupBy={(option) => option[1][0]}
                        // getOptionLabel={(option) => option[1].trim() + " " + option[2].trim()}
                        getOptionLabel={(option) => option[1] + " " + option[2]}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Personas" />}
                        onChange={(event: any, newValue: string | null) => {
                            setPersonId(newValue);
                        }}
                        />
                </div>
                
                <button className="app__images-button" style= {{marginTop: "1rem" , marginBottom: "1rem"}} type="submit" onClick={Handlesubmit}>Mostrar</button>

                <div>
                    {images.length ? (
                        images.map((image, index) => (
                            <ul key={index}>
                            <li>
                                <img key={index} src={"data:image/jpeg;base64," + image[2]} alt={`Image ${index + 1} from Flask`} id={image[0]} />
                            </li>
                            <li>
                                <button id={image[0]} className="app__images-button" onClick={() => handleDelete(image[0],image[1])}>Borrar imagen</button>
                            </li>
                        </ul>
                        ))
                        ) : (
                            <p>Loading...</p>
                            )}
                </div>

            </div>
            </MDBCardBody>
           
        </div>
    </div>
    </>
)  
}
export default PersonShowImagesTrain;