'use client'

import { useState } from 'react';

export default function Input() {
  const [typed_message, setMessage] = useState("");
  const handleChange = (event) => {
    setMessage(event.target);
  }
  
  return <input 
    type="text"
    id = "chatbot-message-input"
    className="input"
    onChange={handleChange}
  />
}