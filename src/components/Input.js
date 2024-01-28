"use client";

import { useState } from "react";

import { IoMdSend } from "react-icons/io";

export default function Input({ handleFormSubmit, disabled, className }) {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="form-container">
      <input
        disabled={disabled}
        type="text"
        id="chatbot-message-input"
        className={className}
        value={message}
        onChange={handleChange}
      />

      <button
        disabled={disabled}
        className="submit-button"
        onClick={() => {
          handleFormSubmit(message);
          setMessage("");
        }}
      >
        <IoMdSend />
      </button>
    </div>
  );
}
