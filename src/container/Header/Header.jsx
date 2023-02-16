import React from 'react'
import './Header.css'
import Face_detection from '../../assets/Face_detection.png'


function Header ({ tutorialRef }){

  const handleClickScroll = () => {
    const element = document.getElementById('tutorial-component');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className='app__header app__wrapper section__padding '>   
        <div className='app_header-info'>
            <h1 className='app__header-h1'>Face Api Recognition </h1>
            <p className='app__header-p'> Esta aplicación tiene como finalidad la detección de caras dentro de una foto. Esto es realizado a través de Azure Cognitive Services.</p>
            <button className='app__header-button' type='button' onClick={handleClickScroll}>Get started</button>
            <img className='app__header-img' src={Face_detection} alt="header img" />
        </div>
        
    </div>
  )
}

export default Header