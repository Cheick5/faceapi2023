import React, {useCallback} from 'react'
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

class FileUpload extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedFile:'',
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
        })
    }
    
    submit(){
        
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        // console.warn(this.state.selectedFile);
        let url = "http://localhost:8080/upload.php";
        // php -S 127.0.0.1:8080
        axios.post(url, data, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            console.log(res);
            console.log(res['data']);
            localStorage.setItem('image-info',JSON.stringify(res['data']));
            // const navigate = useNavigate();
            // navigate('/sample', {replace: true});
            // useCallback(() => navigate('/sample', {replace: true}), [navigate]);

            // window.open("/uploaded?file=" + res['data']);
            // return (<Navigate to="/uploaded" replace = {true}/>)
            //<Link to="/upload" target="_blank" rel="noopener noreferrer" />
        })
        console.log('File Uploaded');
        

        
    }
 
    render(){
        return(            
            <>
            <div className = "Upload" style = {{display : "flex" , justifyContent : "center"}}s>
                <div className="row">
                    <div className="col-md-auto">
                        <MDBCardBody className='px-5'>
                                    <h2 style= {{marginTop: "2rem"}} className="text-uppercase text-center mb-5">Selecciona un archivo :</h2>
                                    <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
 
                            <div className="form-row">
                                <div>
                                    <button style= {{marginTop: "1rem" , marginBottom: "1rem"}} type="submit" className="btn btn-dark" onClick={()=>this.submit()}>Save</button>
                                </div>
                                    <Link to = "/uploaded">
                                        <button style= {{marginTop: "1rem" , marginBottom: "1rem"}} type="submit" className="btn btn-dark">Ver tabla</button>
                                    </Link>



                            </div>
                    </MDBCardBody>
                    </div>
                </div>
            </div>
            </>
        )  
    }
}
 
export default FileUpload;