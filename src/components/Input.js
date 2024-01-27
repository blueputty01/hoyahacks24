'use client'

import { useState } from 'react';

export default function Input() {
  const [typed_message, setMessage] = useState("");
  const handleChange = (event) => {
    setMessage(event.target);
  };
  
  const handleFormSubmit = (event) => {
    let submit_data = event.target.value;
    
    // TODO
  };

  return  <form>
  <input
    type="text"
    id = "chatbot-message-input"
    className="input"
    onChange={handleChange}
  />

  <input 
    type="submit" 
    value=">"
  />

  </form>
}