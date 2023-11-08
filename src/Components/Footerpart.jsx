import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';


function Footerpart() {
  return (
    <div>
        <div className='Footer'>
         <div className='Footer-left'>
              <img src="/assets/images/footer.webp" alt='Imagemissing' className='footer-img' />
         </div>
         <div className='Footer-right'>
            
            <div className='right1'>
            <ul className='footer-ul'>
                <h4>Services</h4>
                <li className='footer-li'>Time Management</li>
                <li className='footer-li'>Time Submission</li>
                <li className='footer-li'>Time Tracking</li>
                <li className='footer-li'>Leave Off</li>
                <li className='footer-li'>Calender Integration</li>
            </ul>
            </div>
            <div className='right2'>
            <ul className='footer-ul'>
                <h4>About</h4>
                <li className='footer-li'>Careers</li>
                <li className='footer-li'>Projects</li>
                <li className='footer-li'>Contact</li>
                <li className='footer-li'>Support</li>
            </ul>
            
            </div>
            <hr className='hr-tag' />
            <div className='Social-icons'>
            <ul className='social-icon-ul'>

  <li className='social-li'><FontAwesomeIcon icon={faInstagram} /></li>
  <li className='social-li'><FontAwesomeIcon icon={faTwitter} /></li>
  <li className='social-li'><FontAwesomeIcon icon={faYoutube} /></li>


            </ul>     
           </div> 
            </div>
        </div>
    </div>
  )
}

export default Footerpart