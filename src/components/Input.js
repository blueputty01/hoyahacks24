'use client';

import styles from './input.module.css';

import { useState } from 'react';

import { IoMdSend } from 'react-icons/io';

export default function Input({ handleFormSubmit, isDisabled }) {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className={styles.formcontainer}>
      <input
        disabled={isDisabled}
        type="text"
        id="chatbot-message-input"
        className={styles.textboxClassName}
        value={isDisabled ? 'Loading' : message}
        onChange={handleChange}
      />

      <button
        disabled={isDisabled}
        className={styles.buttonClassName}
        onClick={() => {
          handleFormSubmit(message);
          setMessage('');
        }}
      >
        <IoMdSend />
      </button>
    </div>
  );
}
