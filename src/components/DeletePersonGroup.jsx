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


function DeletePersonGroup() {

    const [groupid, setgroupid] = useState({})
    const [list, setList] = useState([])
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    
    const handleDelete = async (e) => {
        console.log("Entro a borrar");
        
        try {
            // console.log("Entro a borrar, con groupid: " + groupid);
            console.log("Entro a borrar, con groupid: " + JSON.stringify({ groupid }));
            const response = await axios.delete('http://localhost:5000/delete_delete_list_persons', 
                { data: { groupid } }    ,
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


    const handleSelect = async (e) => {
        console.log("dropdown")
        e.preventDefault();
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

    
    return ( 
    <>
    <div className = "Upload">
        <div className="row" style = {{textAlign : 'center'}}>
            <div className="col-md-6 offset-md-3">
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Borra un PersonGroup</h2>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form > 
                        <label>
                        Selecciona un GroupId: 
                        <select onClick = {handleSelect} value={groupid} onChange={(e) => setgroupid(e.target.value)}>
                            {list.map((e,key) => {
                               return <option key={key} value={e}> {e} </option>
                            })}
                            
                        </select>
                        </label>
                        
                        <button type='button' style = {{marginBottom : "2rem"}} onClick={handleDelete} >Borrar</button>
                    </form>
                </MDBCardBody>
            </div>
        </div>
    </div>
    </>

     );
}

export default DeletePersonGroup;