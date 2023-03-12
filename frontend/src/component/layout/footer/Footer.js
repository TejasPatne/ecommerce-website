import React from 'react';
import './Footer.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import {FaInstagramSquare} from 'react-icons/fa';
import {RiYoutubeFill} from 'react-icons/ri';
import {FaFacebookSquare} from 'react-icons/fa';


const Footer = () => {
  return (
    <CardGroup>
        <Card className='border-0 text-center py-5'>
          <Card.Body>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="Appstore" />
          </Card.Body>
        </Card>
        <Card className='border-0 text-center py-4'>
          <Card.Body>
            <h1>IANSABI ECOMMERCE.</h1>
            <p>High Quality is our first priority</p>
            <p>Copyrights 2022 &copy; MeTejasPatne</p>
          </Card.Body>
        </Card>
        <Card className='border-0 text-center py-5'>
            <h4>Follow Us</h4>
            <a href="https://instagram.com/tejas_patne_45" target="blank"><FaInstagramSquare/> Instagram</a>
            <a href="https://www.youtube.com/channel/UCqC7vuOxjMI2lBFT-zm6GLg" target="blank"><RiYoutubeFill/> Youtube</a>
            <a href="https://facebook.com/tejas.patne.45" target="blank"><FaFacebookSquare/> Facebook</a>
        </Card>
    </CardGroup>
  )
}

export default Footer