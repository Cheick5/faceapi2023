import React, {useState,useRef,} from 'react'
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import {MDBCardBody} from 'mdb-react-ui-kit';
import './Person.css'

function CreatePerson() {

    const [groupid, setgroupid] = useState([])
    const [list, setList] = useState([])
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    const [Fname, setFname] = useState("")
    const [Lname, setLname] = useState("")
    const [rut, setRut] = useState("")
    


    const handleSelect = async (e) => {
        e.preventDefault();
        console.log("dropdown")
        try {
            const response = await axios.get('http://localhost:5000/get_list_person_groups',  
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setList(response.data);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("nombre: " + Fname);
        console.log("apellidos: " + Lname);
        console.log("rut: " + rut);
        
        try {
            const response = await axios.post('http://localhost:5000/post_create_person',
                { "groupid": groupid,"name": Fname,"userData" : ""+ Lname +","+ rut},

                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            // setSuccess(true);
         
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
    return ( 
    <>
    <div className = "app__person-card">
            <div>
                <MDBCardBody className='app__person-card-info'>
                    <h1 >Crea una persona para un PersonGroup</h1>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    
                    <div className = "app__person-container">     
                        <div style = {{marginBottom : "2rem"}}>
                            <form >
                                <FormControl fullWidth required>
                                <InputLabel htmlFor="grouped-native-select"> GroupId</InputLabel>
                                <Select style = {{color : 'white'}} onOpen = {handleSelect} value={groupid} onChange={(e) => setgroupid(e.target.value)}>
                                <MenuItem disabled value=""> -- Ej: Presidentes -- </MenuItem>
                                    {list.map((e,key) => {
                                       return <MenuItem key={key} value={e}> {e} </MenuItem>
                                    })}
                                </Select>
                                </FormControl>
                            </form>
                        </div>
                        <div style = {{marginBottom : "1.5rem"}}>
                            <TextField
                                    multiline
                                    inputProps= {{ style: { color: "white" } }}
                                    InputLabelProps = {{ style: { color: "white" } }}
                                    label="Nombre"
                                    helperText="Ej: Manuel"
                                    onChange={(e) => setFname(e.target.value)}
                                    value={Fname}
                                />
                        </div>
                        <div style = {{marginBottom : "1.5rem"}}>
                            <TextField
                                    multiline
                                    inputProps= {{ style: { color: "white" } }}
                                    InputLabelProps = {{ style: { color: "white" } }}
                                    label="Apellidos"
                                    helperText="Ej: Blanco"
                                    onChange={(e) => setLname(e.target.value)}
                                    value={Lname}
                                />
                        </div>
                        <div style = {{marginBottom : "1.5rem"}}>
                            <TextField
                                    multiline
                                    inputProps= {{ style: { color: "white" } }}
                                    InputLabelProps = {{ style: { color: "white" } }}
                                    label="Rut sin puntos ni digito verificador"
                                    helperText="Ej: 11233333"
                                    onChange={(e) => setRut(e.target.value)}
                                    value={rut}
                                />
                        </div>
                    </div>

                        <i className="uil uil-user"></i>
                        <button className='app__person-button' trype = "buttom" onClick = {handleSelect} style = {{marginBottom : "2rem"}} >Save</button>
                </MDBCardBody>
            </div>
        
    </div>
    </>

     );
}

export default CreatePerson;