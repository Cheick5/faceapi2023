import React, {useRef, useState } from 'react'
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {MDBCardBody} from 'mdb-react-ui-kit';;

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
        <div className = "Upload" style = {{display : "flex" , justifyContent : "center", marginTop: '2rem'}}s>
            <div className="row">
                <div className="col-md-auto">
                    <h1 style = {{marginBottom : "2rem"}}>Borra una persona</h1>
                    <MDBCardBody className='px-5'>
                        <div className="input-group">
                            {/* <label className="input-label">
                                Group ID:
                            </label> */}

                            <FormControl fullWidth id="groupidformcontrol" required>  
                            <InputLabel htmlFor="grouped-native-select">Group ID:</InputLabel>

                                <Select required className="input-select"onOpen = {handleSelectGroup} value={groupId} onChange={(e) => setGroupId(e.target.value)}>
                                <MenuItem disabled value=""> -- Ej: Presidentes -- </MenuItem>
                                {listGroupId.map((item) => (
                                    <MenuItem key={item} value={item}>
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                        </div>
                        
                        <FormControl fullWidth> 
                            <InputLabel htmlFor="grouped-native-select">Person ID:</InputLabel>
                            {/* <label className="input-label">
                            Person ID:
                            </label> */}
                            <Select className="input-select"  onOpen = {handleSelectPerson} value={personId} onChange={(e) => setPersonId(e.target.value)}>
                            <MenuItem disabled value=""> -- Ej: 13289123809 -- </MenuItem>

                            {listPersonId.map((item) => (
                                
                                <MenuItem key={item.split(',')[1]} value={item.split(',')[1]}>
                                {item.split(',')[0]+ " "+ item.split(',')[2]+ " Rut: " + item.split(',')[3]}
                                </MenuItem>
                            ))}
                            </Select>
                            </FormControl>
    

                        <div className="form-row">
                            <div>
                                <button style= {{marginTop: "1rem" , marginBottom: "1rem"}} type="submit" className="btn btn-dark" onClick={Handlesubmit}>Borrar</button>
                            </div>
                        </div>
                    </MDBCardBody>
                </div>
            </div>
        </div>
        </>
    )  
}
export default FileUpload;