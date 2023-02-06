import React, {useCallback,useState,useRef,useEffect} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom"
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
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
        <div className = "Upload">
            <div className="row" style = {{textAlign : 'center'}}>
                <div className="col-md-6 offset-md-3">
                    <MDBCardBody className='px-5'>
                        <h2 className="text-uppercase text-center mb-5">Crea un curso para subir a la base de datos</h2>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        {/* <form > 
                            <label>
                            Selecciona un GroupId: 
                            <select onClick = {handleSelect} value={groupid} onChange={(e) => setgroupid(e.target.value)}>
                            <option value=""> -- Ej: Presidentes -- </option>
                                {list.map((e,key) => {
                                   return <option key={key} value={e}> {e} </option>
                                })}
                            </select>
                            </label>
                            <br></br><br></br>
                        </form> */}
                        <form onSubmit={handleSubmit}>
                            <div className="input-field"  >
                                <input name = "Name" type='text' value={name} placeholder= 'Ej: DISEÑO DE SOFTWARE Sec.1' required onChange={(e) => setName(e.target.value)}/>
                            <br></br><br></br>
                                <input name = "Year" type='text' value={year} placeholder= 'Ej: 2022' required onChange={(e) => setYear(e.target.value)}/>
                            <br></br><br></br>
                                <input name = "Semester" type='text' value={semester} placeholder= 'Ej: 2' required onChange={(e) => setSemester(e.target.value)}/>
                            <br></br><br></br>
                                <input name = "Short_Name" type='text' value={short_name} placeholder= 'Ej: TICS316' required onChange={(e) => setShort_Name(e.target.value)}/>
                            <br></br><br></br>
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