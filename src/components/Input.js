"use client";

import { useState, useEffect } from "react";

export default function Input({ handleFormSubmit }) {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form>
      <input
        type="text"
        id="chatbot-message-input"
        className="input"
        value={message}
        onChange={handleChange}
      />

      <input
        type="submit"
        value=">"
        onSubmit={() => {
          handleFormSubmit(message);
          setMessage("");
        }}
      />
    </form>
  );
}
