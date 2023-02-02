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


function CreatePerson() {

    const [groupid, setgroupid] = useState({})
    const [person, setPerson] = useState("")
    const [selectgroup, setSelectgroup] = useState("")
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
    <div className = "Upload">
        <div className="row" style = {{textAlign : 'center'}}>
            <div className="col-md-6 offset-md-3">
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Crea una persona para un PersonGroup</h2>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form > 
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
                    </form>
                    <form onSubmit={handleSubmit}>
                        <div className="input-field"  >
                            <input name = "first_name" type='text' value={Fname} placeholder= 'Ej: Manuel ' required onChange={(e) => setFname(e.target.value)}/>
                        <br></br><br></br>
                            <input name = "last_name" type='text' value={Lname} placeholder= 'Ej: Blanco' required onChange={(e) => setLname(e.target.value)}/>
                        <br></br><br></br>
                            <input name = "rut" type='text' value={rut} placeholder= 'Ej: 11233333' required onChange={(e) => setRut(e.target.value)}/>
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
}

export default CreatePerson;