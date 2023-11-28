import React, { useState } from "react";
import ForgotPasswordContainer from "./ForgotPasswordContainer";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKTEND_URL;
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMessage("");
  };

  const handleSendResetLink = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${backendUrl}/user/password/forgot`, {
        email,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setMessage("No user found with this email address.");
      } else {
        setMessage("Error sending reset link. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ForgotPasswordContainer>
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset link.</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <button onClick={handleSendResetLink} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
        <p
          className={
            message.includes("Error") ? "error-message" : "success-message"
          }
        >
          {message}
        </p>
      </div>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
