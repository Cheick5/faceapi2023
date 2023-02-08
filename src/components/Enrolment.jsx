import React, {useState,useRef,useEffect} from 'react'
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import {
    MDBCardBody,
  }
  
  from 'mdb-react-ui-kit';;

  function Enrolment() {


    const [listPersonas, setListPersonas] = useState([])
    const [listPersonas2, setListPersonas2] = useState("")
    const [listCourses, setListCourses] = useState("")
    const [persona, setPersona] = useState("")
    const [course, setCourse] = useState("")
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/post_enrol_person', 
                {  "personid": persona[0],"courseid": course[0]}    ,
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
    
    useEffect(() =>  {
        // call api or anything
        console.log("loaded");
        
            async function fetchcourse() {
                console.log('first')
                try {
                    const response = await axios.get('http://localhost:5000/get_get_course',  
                        {
                            headers: { 'Content-Type': 'application/json' }
                        }
                    );
                    await setListCourses(response.data);
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
            fetchcourse();

            async function fetchperson() {
                console.log('first')
                try {
                    const response = await axios.get('http://localhost:5000/get_get_person',  
                        {
                            headers: { 'Content-Type': 'application/json' }
                        }
                    );
                    await setListPersonas(response.data);
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
            fetchperson();
            const x = listPersonas.map(function(x) {
                return x[1];
            });
            console.log("x");
            console.log(x);
            setListPersonas2(x);

            if(listCourses !== "") {
                console.log(listCourses)
            }

     },[]);

     const wena = async (e) => {
        console.log(listCourses)
        console.log(listPersonas)
        console.log(listPersonas2)
        console.log(persona)

     }

    return ( 
        <>
        <div className = "Upload">
            <div className="row" style = {{textAlign : 'center'}}>
                <div className="col-md-auto">
                    <MDBCardBody className='px-5'>
                        <h2 className="text-uppercase text-center mb-5"> Inscribe un alumno a un curso</h2>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <form 
                        // onSubmit={handleSubmit}
                        >
                            <div className="input-field" style = {{textAlign: "right",display: 'flex'}}>

                                {/* <label for="persona">Persona </label>
                                <input name = "persona" type='text' value={persona} placeholder= 'Ej: Manuel Blanco' required onChange={(e) => setpersona(e.target.value)}/>
                                <i className="uil uil-user"></i> */}

                                <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={listPersonas}
                                getOptionLabel={(option) => option[1]}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Personas" />}
                                onChange={(event: any, newValue: string | null) => {
                                    setPersona(newValue);
                                }}
                                />



                                <br></br><br></br>

                                {/* <label for="course">Curso </label>
                                <input name = "course" type='text' value={course} placeholder= 'Ej: Diseño de software' required onChange={(e) => setCourse(e.target.value)}/>
                                <i className="uil uil-user"></i> */}

                                <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={listCourses}
                                getOptionLabel={(option) => option[1]}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Curso" />}
                                onChange={(event: any, newValue: string | null) => {
                                    setCourse(newValue);
                                }}
                                />

                            </div> 


                            <br></br><br></br>

                            <button style = {{marginBottom : "2rem"}} onClick ={(e) => handleSubmit(e)}
                             >Inscribir </button>
                        </form>
                        <button style = {{marginBottom : "2rem"}} onClick={(e) => wena(e)}>wena </button>
                    </MDBCardBody>
                </div>
            </div>
        </div>
        </>
    
         );

  }

  export default Enrolment;