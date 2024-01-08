import React, { useRef, useState } from "react";
import Button from "./Button";
import "../Styles/Contact_us.css";
import Contactus from "../Images/Contactus.png";
import { FaPhoneAlt, FaEnvelope, FaTwitter, FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import Navbar1 from "./Navbar1";
import emailjs from "emailjs-com";

const Contact_us = () => {
  const form = useRef();
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_qty0l5m", "template_eu9nbfx", form.current, "cNpwItKK8du-F8jos")
      .then(
        (result) => {
          console.log(result.text);
          setMessage("Email sent successfully");
          form.current.reset();
          setTimeout(() => {
            setMessage("");
          }, 3000);
        },
        (error) => {
          console.log(error.text);
          setMessage("Email not sent");
          setTimeout(() => {
            setMessage("");
          }, 3000);
        }
      );
  };

  return (
    <div>
      <Navbar1 />
      <div className="contact_head">
        <h1>Contact us</h1>
      </div>

      <div className="contact_flex_section">
        <div className="contact_body">
          <div className="contact_header">
            <h1>Get in touch</h1>
            <h2>We are here for you! How can we help you?</h2>
          </div>
          <form className="contact_form" ref={form} onSubmit={sendEmail}>
            <div className="contact_form-group">
              <label htmlFor="name">Your Name</label>
              <div>
                <input type="text" placeholder="Enter your name" name="user_name" />
              </div>
            </div>
            <div className="contact_form-groupp">
              <label htmlFor="email">Your E-mail</label>
              <div>
                <input type="text" placeholder="Enter your email" name="user_email" />
              </div>
            </div>
            <div className="contact_form-group">
              <label htmlFor="message">Go ahead, we are listening</label>
              <div>
                <input type="text" placeholder="" className="tall-input" name="message" />
              </div>
            </div>
            <div className="contact-button">
              <Button type="submit" value="send" />
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>

        <div className="contact_details">
          <img src={Contactus} alt="contactus" />
          <div className="telnmail">
            <div className="contacts">
              <h3 style={{ fontSize: "20px" }}>
                <FaPhoneAlt />01123445678 / 0768323678
              </h3>
              <h3 style={{ fontSize: "20px" }}>
                <FaEnvelope />hbmslk@gmail.com
              </h3>
            </div>
          </div>
          <div className="socialmed">
            <h3 style={{ fontSize: "20px" }}>Follow us on</h3>
            <span id="icons">
              <FaFacebookSquare />
              <FaInstagramSquare />
              <FaTwitter />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact_us;


