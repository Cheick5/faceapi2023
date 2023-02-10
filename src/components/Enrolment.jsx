import React, {useState,useRef} from 'react'
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {
    MDBCardBody,
  }
  
  from 'mdb-react-ui-kit';;

  function Enrolment() {


    const [listPersonas, setListPersonas] = useState([])
    const [listCourses, setListCourses] = useState([])
    const [listGroupId, setListGroupId] = useState([]);
    const [persona, setPersona] = useState("")
    const [course, setCourse] = useState("")
    const [errMsg, setErrMsg] = useState('');
    const [groupId, setGroupId] = useState("");
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

    const handleSelectedGroup = async (e) => {
        
        setGroupId(e.target.value);
        fetchcourse();
        fetchperson(e.target.value);

    }

    const handleGroup = async (e) => {
        e.preventDefault();

    }

    const fetchcourse = async (e) =>  {
        // e.preventDefault();
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
    // const x = listPersonas.map(function(x) {
    //     return x[1];
    // });
    // console.log("x");
    // console.log(x);
    // setListPersonas2(x);




     const wena = async (e) => {
        console.log(listCourses)
        console.log(listPersonas)
        // console.log(listPersonas2)
        // console.log(persona)

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
                        <FormControl fullWidth>       
                        <InputLabel htmlFor="grouped-native-select">GroupId</InputLabel>         
                        <Select className="input-select"onOpen = {handleSelectGroup} value={groupId} defaultValue = "a" 
                        onChange={(e) => handleSelectedGroup(e)}
                        >

                        <MenuItem  disabled value=""> -- Ej: Presidentes -- </MenuItem>

                        {listGroupId.map((item) => (
                            <MenuItem  key={item} value={item}>
                            {item}
                            </MenuItem>
                        ))}

                        </Select>
                        </FormControl>
                            <div className="input-field" style = {{textAlign: "right",display: 'flex'}}>

                                {/* <label for="persona">Persona </label>
                                <input name = "persona" type='text' value={persona} placeholder= 'Ej: Manuel Blanco' required onChange={(e) => setpersona(e.target.value)}/>
                                <i className="uil uil-user"></i> */}

                                <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={listPersonas}  
                                groupBy={(option) => option[1][0]}
                                getOptionLabel={(option) => option[1] + " " + option[2]}
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
                                groupBy={(option) => option[1][0]}
                                getOptionLabel={(option) => option[1].trim() + " " + option[2]}
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