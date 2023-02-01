import React from 'react';
import CreatePersonGroup from '../../components/CreatePersonGroup';
import CreatePerson from '../../components/CreatePerson';
import DeletePersonGroup from '../../components/DeletePersonGroup'
import FileUpload  from '../../components/FileUpload';
import Addperson  from '../../components/Addperson';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Index() {
    return (
        
        <div>
            <h1 className = "Titulo" style={{textAlign: 'center',fontWeight: 'bold'}}> Face Api</h1>

                <div className="row">
                    <div className="col" style = {{justifyContent : "center" , display : "flex"}}>
                        <FileUpload/> 
                    </div>
                </div>
            
            <div className = "container" style= {{marginTop: "1rem" , marginBottom: "1rem"}}>   
                <div className="row" style= {{marginTop: "1rem" , marginBottom: "1rem"}} >
                    <div className="col" style = {{justifyContent : "center" , display : "flex"}}>
                        <CreatePersonGroup/>
                    </div>
                    <div className="col" style = {{justifyContent : "center" , display : "flex"}} >  
                        <DeletePersonGroup/>
                    </div>
                </div>
                <div className="row" style= {{marginTop: "1rem" , marginBottom: "1rem"}} >
                    <div className="col" style = {{justifyContent : "center" , display : "flex"}}>
                    <CreatePerson/>
                    </div>
                </div>
                <Addperson/>
            
            
            
            </div>
            {/* <p className = "Bienvenida">alo</p> */}
        </div>  

    )
}