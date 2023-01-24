import React from 'react';
import CreatePersonGroup from '../../components/CreatePersonGroup';
import  FileUpload  from '../../components/FileUpload';
export function Index() {
    return (
        
        <div className = "Titulo">
            <h1 style={{textAlign: 'center',fontWeight: 'bold'}}> Face Api</h1>
            <FileUpload/> 
            <CreatePersonGroup/>
            {/* <p className = "Bienvenida">alo</p> */}
        </div>  

    )
}