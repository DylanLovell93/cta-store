import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { AiFillFacebook } from 'react-icons/ai';
import { AiFillGithub } from 'react-icons/ai';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="Footer">
      <Link to="/" className="footerIcon">
        uShop
      </Link>
      <ul className="footerLinks">
        <li>
          <a href="https://facebook.com">
            <AiFillFacebook color="white" size="30px" />
          </a>
        </li>
        <li>
          <a href="https://github.com">
            <AiFillGithub color="white" size="30px" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com">
            <AiFillTwitterCircle color="white" size="30px" />
          </a>
        </li>
        <li>
          <a href="https://instagram.com">
            <AiFillInstagram color="white" size="30px" />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
