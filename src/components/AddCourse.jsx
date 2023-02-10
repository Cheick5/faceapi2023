import React, {useState,useRef} from 'react'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import {
    MDBCardBody,
  }
  
  from 'mdb-react-ui-kit';;


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
        <div className = "Upload">
            <div className="row" style = {{textAlign : 'center'}}>
                <div className="col-md-8 offset-md-2">
                    <MDBCardBody className='px-10'>
                        <h2 className="text-uppercase text-center mb-5">Crea un curso para subir a la base de datos</h2>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <form onSubmit={handleSubmit}>
                            <div className="grid-container" >
                                <div style = {{marginRight : "3rem", marginBottom : "1rem"}}>
                                <TextField
                                    multiline
                                    label="Nombre"
                                    helperText="Ej: DISEÑO DE SOFTWARE Sec.1"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                                </div>
                                <div>
                                    <TextField
                                        multiline
                                        label="Short_Name"
                                        helperText="Ej: TICS316"
                                        onChange={(e) => setShort_name(e.target.value)}
                                        value={short_name}
                                    />
                                </div>
                                <div style = {{marginRight : "3rem"}}>
                                <TextField
                                    multiline
                                    label="Año"
                                    helperText="Ej: 2022"
                                    onChange={(e) => setYear(e.target.value)}
                                    value={year}
                                />
                                </div>
                                <div>
                                    <TextField
                                        multiline
                                        label="Semestre"
                                        helperText="Ej: 2"
                                        onChange={(e) => setSemester(e.target.value)}
                                        value={semester}
                                    />
                                </div>

                                <i className="uil uil-user"></i>
                            </div> 
                            <button trype = "buttom"style = {{marginBottom : "2rem"}} >Save</button>
                        </form>
                    </MDBCardBody>
                </div>
            </div>
        </div>
        </>
    
         );


};

export default AddCourse;