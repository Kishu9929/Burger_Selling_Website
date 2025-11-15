import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
        <div classname="h1">
            <img src={assets.logo} alt="" width={150} height={100} />
            </div>
            <p>brrrgrrr, born out of a passion for bold flavors and juicy burgers, is quickly becoming a local favorite for burger lovers.
Located in the heart of the city, brrrgrrr brings together the perfect blend of classic comfort and modern taste.
With a commitment to quality ingredients, quick service, and mouth-watering combinations, we’re here to satisfy every craving.
Whether you're grabbing a quick bite or treating yourself to a loaded feast, brrrgrrr delivers flavor that keeps you coming back.
Join the burger revolution — only at brrrgrrr.

</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Store</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-9824157720</li>
                <li>brrrgrrr@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © Brrrgrrr.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
