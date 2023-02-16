import React from 'react'
import './Tutorial.css'

const Tutorial = () => {
  return (

    <div className = 'app__tutorial-container'> 
        <div className='app__tutorial-group'>
            <div className='app__tutorial-info'>
                <div />
                <h1 className='app-tutorial-h1'> PersonGroup</h1>
                <p className='app-tutorial-p'> El person group bla bla bla asdasdasdasdasdas asdasdasdasdasd asasdasdasd asdasdasdads asd asd  asdasd asd asd asd asd ad asd asdasdasd a dad asd </p>
            </div>
            <div className='app__tutorial-info'>
                <div/>
                <h1 className='app-tutorial-h1'> Person</h1>
                <p className='app-tutorial-p'> El person bla bla bla asdasdasdasdasdasdas dasdasasda sdasdasdas</p>
            </div>   
        </div>  
        <div className='app__tutorial-group'>
            <div className='app__tutorial-info'>
                <div/>
                <h1 className='app-tutorial-h1'> Images</h1>
                <p className='app-tutorial-p'> El Images group bla bla bla dasdasdasdasdasdasdasdasd</p>
            </div>
            <div className='app__tutorial-info'>
                <div/>
                <h1 className='app-tutorial-h1'> Train</h1>
                <p className='app-tutorial-p'> El train group bla bla blaasdasdasdasdasdasdasd </p>
            </div>
        </div>


        <div className='app__tutorial-group'>

            <div className='app__tutorial-info'>
                <div/>
                <h1 className='app-tutorial-h1'> Database</h1>
                <p className='app-tutorial-p'> El database group bla bla bla </p>
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