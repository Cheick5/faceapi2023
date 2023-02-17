import React from 'react'
import './Footer.css'
import footer_img from '../../assets/footer_img.png'
import {BsGithub} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
const Footer = () => {
  return (
    <div className='app__footer section__padding'>
      <div className='app__footer-container'>
        <div className='app_footer-content'>
          <p>Pablo Zúñiga</p>

          <div className='app__footer-icons'>
            <a href="https://github.com/Papoosky" target="_blank">
              <BsGithub style={{color: 'var(--color-sky)', fontSize: '30px'}}/>
            </a>
            <a href="mailto:p.zuniga.mena@gmail.com">
              <MdEmail style={{color: 'var(--color-sky)', fontSize: '30px'}}/>
            </a>
          </div>

        </div>
        <div className='app_footer-content'>
          <img className='footer_img' src={footer_img} alt="footer img" />
        </div>
        <div className='app_footer-content'>
          <p>Nicolás Soto</p>
          <div className='app__footer-icons'>
            <a href="https://github.com/Cheick5" target="_blank">
              <BsGithub style={{color: 'var(--color-sky)', fontSize: '30px'}}/>
            </a>
            <a href="mailto:Nicolassoto1102@gmail.com">
              <MdEmail style={{color: 'var(--color-sky)', fontSize: '30px'}}/>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer