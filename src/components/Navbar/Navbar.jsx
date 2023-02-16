import React, {useState} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoClose} from 'react-icons/io5'
import './Navbar.css'

const Navbar = () => {
  const [toggleMenu, settoggleMenu] = useState(false)
  return (
    
    <nav className='app__navbar'>
        <ul className='app__navbar-links'>
            <li className='p__links'><a href="/">Home</a></li>
            <li className='p__links'><a href="/Verify">Verify</a></li>
            <li className='p__links'><a href="/PersonGroup">PersonGroup</a></li>
            <li className='p__links'><a href="/Person">Person</a></li>
            <li className='p__links'><a href="/Images">Images</a></li>
            <li className='p__links'><a href="/Train">Train</a></li>
            <li className='p__links'><a href="/DataBase">DataBase</a></li>
        </ul>

        <div className='app__navbar-smallscreen'>
          <GiHamburgerMenu color='#fff' fontSize={27} onClick={() => settoggleMenu(true)}/>

          {toggleMenu && (
                <div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
                    <IoClose fontSize={27} className = 'overlay__close' onClick={() => settoggleMenu(false)}/>
                    <ul className='app__navbar-smallscreen_links'>
                      <li className='p__links'><a href="/">Home</a></li>
                      <li className='p__links'><a href="/Verify">Verify</a></li>
                      <li className='p__links'><a href="/PersonGroup">PersonGroup</a></li>
                      <li className='p__links'><a href="/Person">Person</a></li>
                      <li className='p__links'><a href="/Images">Images</a></li>
                      <li className='p__links'><a href="/Train">Train</a></li>
                      <li className='p__links'><a href="/DataBase">DataBase</a></li>
                    </ul>
                </div>
            )}

        </div>
        
    </nav>
  )
}

export default Navbar