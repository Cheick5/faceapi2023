import React, {useState,useRef} from 'react'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import {
    MDBCardBody,
  }
  
  from 'mdb-react-ui-kit';

import './DataBase.css'
const AddCourse = () => {

    // Name,Year,Semester,Short_Name
    const [name,setName] = useState("")
    const [year,setYear] = useState("")
    const [semester,setSemester] = useState("")
    const [short_name,setShort_name] = useState("")
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/post_create_course',
                {"name": name,"year": year,"semester": semester,"short_name": short_name},

                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //TODO: Feedback al usuario
            //console.log(JSON.stringify(response))
            // setSuccess(true);
         
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                console.log('No Server Response');
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
        <div className = "app__data-card">
            <div>
                <MDBCardBody className='app__data-card-info'>
                    <h1>Crea un curso para subir a la base de datos</h1>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    
                    <div className= "app__data-container">
                        <div style = {{marginBottom : "2rem"}}>
                            <form onSubmit={handleSubmit}>
                                <div >
                                    <div style = {{marginBottom : "1.5rem"}}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        inputProps= {{ style: { color: "white" } }}
                                        InputLabelProps = {{ style: { color: "white" } }}
                                        label="Nombre"
                                        helperText="Ej: DISEÑO DE SOFTWARE Sec.1"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        />
                                    </div>
                                    <div style = {{marginBottom : "1.5rem", width:'100%'}}>
                                        <TextField
                                            multiline
                                            fullWidth
                                            inputProps= {{ style: { color: "white" } }}
                                            InputLabelProps = {{ style: { color: "white" } }}
                                            label="Short_Name"
                                            helperText="Ej: TICS316"
                                            onChange={(e) => setShort_name(e.target.value)}
                                            value={short_name}
                                            />
                                    </div>
                                    <div style = {{marginBottom : "1.5rem"}}>
                                    <TextField
                                        multiline
                                        fullWidth
                                        inputProps= {{ style: { color: "white" } }}
                                        InputLabelProps = {{ style: { color: "white" } }}
                                        label="Año"
                                        helperText="Ej: 2022"
                                        onChange={(e) => setYear(e.target.value)}
                                        value={year}
                                        />
                                    </div>
                                    <div style = {{marginBottom : "1.5rem"}}>
                                        <TextField
                                            multiline
                                            fullWidth
                                            inputProps= {{ style: { color: "white" } }}
                                            InputLabelProps = {{ style: { color: "white" } }}
                                            label="Semestre"
                                            helperText="Ej: 2"
                                            onChange={(e) => setSemester(e.target.value)}
                                            value={semester}
                                            />
                                    </div>

                                    <i className="uil uil-user"></i>
                                </div> 
                                <button type = "button" className = 'app__data-button' onClick = {handleSubmit} >Save</button>
                            </form>
                        </div>
                    </div>
                </MDBCardBody>         
            </div>
        </div>
        </>
    
         );


};

export default AddCourse;