"use client";

import { useState, useEffect } from "react";
import { messages } from "app/dashboard/page";

import { IoMdSend } from "react-icons/io";

export default function Input({ handleFormSubmit }) {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="form-container">
      <input
        type="text"
        id="chatbot-message-input"
        className="input"
        value={message}
        onChange={handleChange}
      />

      <button
        className="submit-button"
        onSubmit={() => {
          handleFormSubmit(message);
          setMessage("");
        }}
      >
        <IoMdSend />
      </button>
    </div>
  );
}
