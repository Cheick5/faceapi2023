import React, {useState,useRef,useEffect} from 'react'
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import {MDBCardBody} from 'mdb-react-ui-kit';
import './PersonGroup.css'

function CreatePersonGroup() {

    const [groupid, setGroupid] = useState("")
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    
    useEffect(() => {
        setErrMsg('');
    }, [groupid])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("groupid");
        console.log(groupid)

        try {
            const response = await axios.post('http://localhost:5000/post_create_person_group',
                JSON.stringify({ groupid }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            // await window.location.reload();
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
        <div className='app__persongroup-card'>
            <div>
                <MDBCardBody className='app__persongroup-card-info'>
                    <h1 >Crea un Person Group </h1>  
                        <form>  
                        <FormControl fullWidth style = {{width : "500px"}}>
                            <div className="input-field">
                                <TextField 
                                        multiline
                                        inputProps= {{ style: { color: "white" } }}
                                        InputLabelProps = {{ style: { color: "white" } }}
                                        label="GroupId"
                                        helperText="Ej: Presidentes"
                                        onChange={(e) => setGroupid(e.target.value.toLowerCase())}
                                        value={groupid}
                                        />
                                <i className="uil uil-user"></i>
                            </div> 
                        </FormControl>
                        </form>  
                        <button onClick = {handleSubmit} className = 'app__persongroup-button' >Guardar</button>
                </MDBCardBody>
            </div>
        </div>
                
    </>

     );
}

export default CreatePersonGroup;