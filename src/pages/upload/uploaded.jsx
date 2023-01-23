import React, {useEffect,useState} from 'react';

import getInfo from '../../services/getLocal.js';

export function Uploaded() {

    const[imagen, setImagen] = useState('');
    
    
    useEffect(() => {
        const info = getInfo()
        console.log(info)
        setImagen(info)
      }, []);

    return (
        
        <div className = "Titulo">
            <h1 style={{textAlign: 'center',fontWeight: 'bold'}}> Tabla asistencia</h1>
            <img src={process.env.PUBLIC_URL + 'imagenes/'+imagen} alt="logo" />            
        </div>  
    )
}