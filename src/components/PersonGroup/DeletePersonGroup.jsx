import React, {useState,useRef} from 'react'
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {MDBCardBody} from 'mdb-react-ui-kit';


function DeletePersonGroup() {

    const [groupid, setgroupid] = useState([])
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

    <div className='app__persongroup-card'>
        <div>
        <MDBCardBody className='app__persongroup-card-info'>
                    <h1> Borra un PersonGroup </h1>
                    <div>
                        <form>
                            <FormControl className='app__persongroup-card-form' fullWidth style = {{width : '300px'}} >
                                <InputLabel htmlFor="grouped-native-select" style={{'color' : 'white'}} >GroupId</InputLabel>
                                <Select style = {{color : 'white'}}  onOpen = {handleSelect} value={groupid} onChange={(e) => setgroupid(e.target.value)}>
                                    <MenuItem disabled value=""> -- Ej: Presidentes -- </MenuItem>

                                    {list.map((e,key) => {
                                        return <MenuItem key={key} value={e}> {e} </MenuItem>
                                    })}
                                
                                </Select>
                            </FormControl>
                        </form>
                   </div>
                    <i className="uil uil-user"></i>
                    <button type='button' style= {{marginTop: '2rem'}} className = 'app__persongroup-button' onClick={handleDelete} >Borrar</button>
        </MDBCardBody>
        </div>
    </div>
    </>

     );
}

export default DeletePersonGroup;