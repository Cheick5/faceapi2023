import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='app__navbar'>

        <ul className='app__navbar-links'>
            <li className='p__links'><a href="/">Home</a></li>
            <li className='p__links'><a href="/PersonGroup">PersonGroup</a></li>
            <li className='p__links'><a href="/Person">Person</a></li>
            <li className='p__links'><a href="/Images">Images</a></li>
            <li className='p__links'><a href="/Train">Train</a></li>
            <li className='p__links'><a href="/DataBase">DataBase</a></li>
        </ul>
        
    </nav>
  )
}

export default Navbar