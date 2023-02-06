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
    <div className = "Upload">
        <div className="row" style = {{textAlign : 'center'}}>
            <div className="col-md-auto">
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Crea un Person Group </h2>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-field">
                            <label for="groupid">GroupId</label>
                            <input name = "groupid" type='text' value={groupid} placeholder= 'Ej: Presidentes' required onChange={(e) => setGroupid(e.target.value)}/>
                            <i className="uil uil-user"></i>
                        </div> 
                        <button style = {{marginBottom : "2rem"}} >Save</button>
                    </form>
                </MDBCardBody>
            </div>
        </div>
    </div>
    </>

     );
}

export default CreatePersonGroup;