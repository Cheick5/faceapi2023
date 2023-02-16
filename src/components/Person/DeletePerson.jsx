import React, {useRef, useState } from 'react'
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {MDBCardBody} from 'mdb-react-ui-kit';
import './Person.css'

export function FileUpload(){

    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    //Lista de las personas
    const [listPersonId, setListPersonId] = useState([]);
    const [listGroupId, setListGroupId] = useState([]);

    //Group, person and image seleccionados 
    const [groupId, setGroupId] = useState("");
    const [personId, setPersonId] = useState("");
    
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
    const handleSelectPerson = async (e) => {
        e.preventDefault();
        if (groupId === ""){
            setErrMsg('Select a Group');
            console.log("Select a Group");
            return;
        }
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
        
        try {
            const response = await axios.delete('http://localhost:5000/delete_persons', 
                { data: { groupId, personId} }    ,
                {
                    header: {'Content-Type' : 'application/json'},
                }
            );
            console.log(JSON.stringify(response?.data));


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
 
    return(            
        <>
        <div className = "app__person-card" >
            
                <div>
                    <MDBCardBody className='app__person-card-info'>
                    <h1>Borra una persona de un PersonGroup</h1>
                    <div className = "app__person-container">    
                        <div style = {{marginBottom : "1.5rem"}}>
                            <form>
                                {/* <label className="input-label">
                                    Group ID:
                                </label> */}

                                <FormControl fullWidth required style={{width : '300px'}}>  
                                <InputLabel htmlFor="grouped-native-select">Group ID:</InputLabel>
                                <Select style = {{color : 'white'}} required className="input-select"onOpen = {handleSelectGroup} value={groupId} onChange={(e) => setGroupId(e.target.value)}>
                                <MenuItem disabled value=""> -- Ej: Presidentes -- </MenuItem>
                                {listGroupId.map((item) => (
                                    <MenuItem key={item} value={item}>
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                                </FormControl>

                            </form>
                        </div>
                        <form>
                        <FormControl fullWidth> 
                            <InputLabel htmlFor="grouped-native-select">Person ID:</InputLabel>
                            <Select style = {{color : 'white'}} className="form-input-select"  onOpen = {handleSelectPerson} value={personId} onChange={(e) => setPersonId(e.target.value)}>
                            <MenuItem disabled value=""> -- Ej: 13289123809 -- </MenuItem>

                            {listPersonId.map((item) => (
                                
                                <MenuItem key={item.split(',')[1]} value={item.split(',')[1]}>
                                {item.split(',')[0]+ " "+ item.split(',')[2]+ " Rut: " + item.split(',')[3]}
                                </MenuItem>
                            ))}
                            </Select>
                            </FormControl>
                        </form>

    
                        </div>
                        <i className="uil uil-user"></i>
                        <button className='app__person-button' trype = "buttom" >Save</button>
                </MDBCardBody>
                </div>   
       
        </div>
        </>
    )  
}
export default FileUpload;