"use client";

import { useState, useEffect } from "react";
import { messages } from "app/page";

import { IoMdSend } from "react-icons/io";

export default function Input({ handleFormSubmit }) {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        id="chatbot-message-input"
        className="input"
        value={message}
        onChange={handleChange}
      />

      <button
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
