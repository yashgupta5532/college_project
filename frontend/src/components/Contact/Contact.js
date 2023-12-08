import React, { useState } from "react";
import "./Contact.css";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { contactAdmin } from "../../Action/UserAction";

function Contact() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    contactNo: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming formData contains the form fields
    const dataToSend = {
      name: formData.name,
      address: formData.address,
      email: formData.email,
      contactNo: formData.contactNo,
      message: formData.message,
    };
    
    const response = await dispatch(contactAdmin(dataToSend));
    if (response?.success) {
      alert.success(response.message);
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="name">
            <i className="fas fa-user"></i>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="address">
            <i className="fas fa-map-marker-alt"></i>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">
            <i className="fas fa-envelope"></i>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="contactNo">
            <i className="fas fa-phone"></i>
          </label>
          <input
            type="tel"
            id="contactNo"
            name="contactNo"
            placeholder="Contact No"
            value={formData.contactNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="message">
            <i className="fas fa-comment"></i>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
