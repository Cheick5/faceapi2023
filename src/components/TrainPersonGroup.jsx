import React, {useCallback,useState,useRef,useEffect} from 'react'
import axios from 'axios';
import {
    MDBCardBody,
  }
  
  from 'mdb-react-ui-kit';;


function CreatePersonGroup() {

    const [groupId, setGroupId] = useState();
    const [listGroupId, setListGroupId] = useState([]);

    
    
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    
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
          }
          console.log(errMsg)
        }
    return ( 
    <>
    <div className = "Upload">
        <div className="row" style = {{textAlign : 'center'}}>
            <div className="col-md-auto">
                <MDBCardBody className='px-5'>
                <h1>Entrena un Person Group</h1>
                <div className="input-group" style={{margin : '2rem 2rem', alignItems : 'center', justifyContent : 'center'}}>
                            <label className="input-label" style={{marginRight: '2rem'}}>
                                Group ID:
                            </label>
                            <select className="input-select"onClick = {handleSelectGroup} value={groupId} onChange={(e) => setGroupId(e.target.value)}>
                            <option value=""> -- Ej: Presidentes -- </option>
                            {listGroupId.map((item) => (
                                <option key={item} value={item}>
                                {item}
                                </option>
                            ))}
                            </select>
                            
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