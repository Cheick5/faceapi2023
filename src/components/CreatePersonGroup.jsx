import React, {useState,useRef,useEffect} from 'react'
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import {MDBCardBody} from 'mdb-react-ui-kit';;


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
                    <FormControl fullWidth style = {{marginBottom : "2rem"}} >
                        <div className="input-field">

                            <TextField
                                    multiline
                                    label="GroupId"
                                    helperText="Ej: Presidentes"
                                    onChange={(e) => setGroupid(e.target.value.toLowerCase())}
                                    value={groupid}
                                />
                            <i className="uil uil-user"></i>
                        </div> 
                    </FormControl>
                        <button onClick = {handleSubmit} style = {{marginBottom : "2rem"}} >Save</button>
                </MDBCardBody>
            </div>
        </div>
    </div>
    </>

     );
}

export default CreatePersonGroup;