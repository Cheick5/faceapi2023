import React from 'react';
import CreatePersonGroup from '../../components/CreatePersonGroup';
import CreatePerson from '../../components/CreatePerson';
import DeletePersonGroup from '../../components/DeletePersonGroup'
import  FileUpload  from '../../components/FileUpload';
import 'bootstrap/dist/css/bootstrap.min.css';
export function Index() {
    return (
        
        <div>
            <h1 className = "Titulo" style={{textAlign: 'center',fontWeight: 'bold'}}> Face Api</h1>
            <FileUpload/> 
            <div className = "container">   
                <div className="row">
                    <div className="col">
                        <CreatePersonGroup/>
                    </div>
                    <div className="col">  
                        <DeletePersonGroup/>
                    </div>
                </div>
            </div>
            <CreatePerson/>
            {/* <p className = "Bienvenida">alo</p> */}
        </div>  

    )
}