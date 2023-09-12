import React, { useState } from "react";
import "./ContactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div class="footer-container">
        <footer>
          <div class="footer-icon">
            <p>
              <a
                href="https://www.instagram.com/ben.ashani/"
                target="_blank"
                title="My Instagram Acount"
                class="button-a"
              >
                <img
                  src="images/instagram-icon.png"
                  width="50px"
                  height="50px"
                />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                title="My Twitter Acount"
                class="button-a"
              >
                <img src="images/twitter-icon.png" width="50px" height="50px" />
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ContactUs;
