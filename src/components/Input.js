"use client";

import styles from "./input.module.css";

import { useState } from "react";

import { IoMdSend } from "react-icons/io";

export default function Input({
  handleFormSubmit,
  disabled,
  textboxClassName,
  buttonClassName,
}) {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className={styles.formcontainer}>
      <input
        disabled={disabled}
        type="text"
        id="chatbot-message-input"
        className={styles.textboxClassName}
        value={message}
        onChange={handleChange}
      />

      <button
        disabled={disabled}
        className={styles.buttonClassName}
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
