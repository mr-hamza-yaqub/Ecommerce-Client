import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineMail,
} from "react-icons/ai";
import "./Footer.scss";
import creditCardImg from "../../assets/creditcardicons.png";
function Footer() {
  return (
    <footer className="Footer">
      <div className="container">
        <div className="content">
          <div className="footer-left">
            <h3 className="title">Follow us</h3>
            <ul className="follow">
              <li className="hover-link center">
                <AiOutlineInstagram />
              </li>
              <li className="hover-link center">
                <AiOutlineFacebook />
              </li>
              <li className="hover-link center">
                <AiOutlineTwitter />
              </li>
              <li className="hover-link center ">
                <AiOutlineMail />
              </li>
            </ul>
          </div>
          <div className="footer-right">
            <h3 className="title">Company</h3>
            <ul className="company">
              <li className="hover-link">Contact Us</li>
              <li className="hover-link">Privacy Policy</li>
              <li className="hover-link">Return and Exchange Policy</li>
              <li className="hover-link">Shipping Policy</li>
              <li className="hover-link">Term & Conditions</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sub-footer center">
        <div className="credit-card-img">
          <img src={creditCardImg} alt="" />
        </div>
        <p>
          Copyright {new Date().getFullYear()} &copy;
          <strong>Posterz.</strong>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
