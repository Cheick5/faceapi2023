import React from 'react'
import './Tutorial.css'

const Tutorial = () => {
  return (

    <div className = 'app__tutorial-container' id = "tutorial-component"> 
        <div className='app__tutorial-group'>
            <div className='app__tutorial-info'>
                <div />
                <h1 className='app-tutorial-h1'> PersonGroup</h1>
                <p className='app-tutorial-p'> El contenedor más global dentro de esta aplicación. Sirve para separar a las personas dentro de el API de Azure. Es importante señalar que una persona puede estar en dos Grupos de Personas distintos, pero para la aplicación serán dos personas distintas. 
                    Los grupos de personas son diferenciados por un “GroupID”, que en esta aplicación será el nombre del grupo. Solo pueden ser letras en minúsculas.
                </p>
            </div>
            <div className='app__tutorial-info'>
                <div/>
                <h1 className='app-tutorial-h1'> Person</h1>
                <p className='app-tutorial-p'> Cada persona dentro de un Grupo de Personas tiene un Id (Person_Id) seleccionado aleatoriamente por Microsoft Azure, un nombre y una string de datos personalizados (Rut y Apellidos).
                    Cada vez que creamos una persona, insertamos a la base de datos en la tabla “Person” una fila con el persistid, primer nombre, apellido, rut, y person_group
                    DEV: En el front-end diferenciamos a las personas en los dropdown y selectores por su nombre y rut, pero cada request a Azure envía solamente el Person ID. 
                </p>
            </div>   
        </div>  
        <div className='app__tutorial-group'>
            <div className='app__tutorial-info'>
                <div/>
                <h1 className='app-tutorial-h1'> Images</h1>
                <p className='app-tutorial-p'> A cada persona hay que entrenarla con imágenes de esa persona sola (Por ahora). Estas imágenes se guardan dentro de la carpeta src/Python/uploads y son enviadas a la API de Azure, la cual NO guarda una copia de la imagen, pero guarda un id para cada foto, llamado persistid.
                    Tanto el persistid como el nombre de la imagen dentro de la carpeta se guarda dentro de la base de datos, teniendo de llave foránea el Person_Id
                    En caso de cualquier error, se puede revisar las imágenes subidas a cada persona y borrar las que quiera.
                </p>
            </div>
            <div className='app__tutorial-info'>
                <div/>
                <h1 className='app-tutorial-h1'> Train</h1>
                <p className='app-tutorial-p'> Una vez se está satisfecho con las fotos subidas, se puede entrenar a todo el grupo de personas a la vez.
                    Se puede entrenar al mismo grupo un número ilimitado de veces, pero hay que tener en cuenta que el entrenamiento no es instantáneo.
                </p>
            </div>
        </div>


        <div className='app__tutorial-group'>

            <div className='app__tutorial-info'>
                <div/>
                <h1 className='app-tutorial-h1'> Database</h1>
                <p className='app-tutorial-p'> En la base de datos  guardamos la información de las personas ingresadas al API de Azure,  un aprtado para ingresar cursos, y otro para inscribir los alumnos a los cursos. Esto es necesario para poder guardar de manera eficiente la asistencia.</p>
            </div>

            <div className='app__tutorial-info'>
                <div/>
                <h1 className='app-tutorial-h1'> Verify</h1>
                <p className='app-tutorial-p'> El Verify group bla bla bla </p>
            </div>
        </div>
    </div>
  )
}

export default Tutorial