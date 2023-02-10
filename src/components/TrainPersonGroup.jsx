import React, {useState} from 'react'
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {
    MDBCardBody,
  }
  
  from 'mdb-react-ui-kit';;


function CreatePersonGroup() {

    const [groupId, setGroupId] = useState([]);
    const [listGroupId, setListGroupId] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    
   
    const handleTrain = async (e) => {
        console.log("Entrenando")
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/post_train_personGroup', 
            JSON.stringify({ groupId }), 
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            
        } catch (err) {
          console.log(errMsg)
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
            console.log(errMsg)
          }
        }
    return ( 
    <>
    <div className = "Upload">
        <div className="row" style = {{textAlign : 'center'}}>
            <div className="col-md-auto">
                <MDBCardBody className='px-5'>
                <h1>Entrena un Person Group</h1>
                <div className="input-group" style={{margin : '2rem 2rem', alignItems : 'center', justifyContent : 'center'}}>
                            
                             <FormControl fullWidth>  
                                {/* <label className="input-label" style={{marginRight: '2rem'}}>
                                    Group ID:
                                </label> */}
                                <InputLabel htmlFor="grouped-native-select">Group ID:</InputLabel>   

                                <Select className="input-select"onOpen = {handleSelectGroup} value={groupId} onChange={(e) => setGroupId(e.target.value)}>
                                <MenuItem value=""> -- Ej: Presidentes -- </MenuItem>
                                {listGroupId.map((item) => (
                                    <MenuItem key={item} value={item}>
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            
                        </div>
                        <button style = {{marginBottom : "2rem"}} onClick = {handleTrain} >Entrenar</button>
                </MDBCardBody>
            </div>
        </div>
    </div>
    </>

     );
}

export default CreatePersonGroup;