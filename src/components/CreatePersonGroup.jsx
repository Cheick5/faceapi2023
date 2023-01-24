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
        console.log(groupid)

        try {
            const response = await axios.post('http://localhost:5000/',
                JSON.stringify({ groupid }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            // setSuccess(true);
            // //clear state and controlled inputs
            // setUsername('');
            // setEmail('');
            // setPassword('');
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
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
            <h2 className="text-uppercase text-center mb-5">Crea una cuenta</h2>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input type='text' value={groupid} placeholder= 'Username' required onChange={(e) => setGroupid(e.target.value)}/>
                    <i class="uil uil-user"></i>
                </div>
                
            
                <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'style={{backgroundColor : "#f93154a6"}} >Register</MDBBtn>
            </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </>

     );
}

export default CreatePersonGroup;