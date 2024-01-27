'use client';

import { useState, useEffect } from 'react';
import { messages } from 'app/page';

import { IoMdSend } from 'react-icons/io';

export default function Input() {
  async function postData(
    url = 'localhost:3000/api/llm/route',
    message,
    userId
  ) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ message, userId }),
      });

      if (response.ok) {
        messages.push({
          id: 0,
          content: response.json.result.response,
        });
      } else {
      }
    } catch (ex) {
      messages.push({
        id: 0,
        content: ex,
      });
    }
  }

  const [typed_message, setMessage] = useState('');
  const handleChange = (event) => {
    setMessage(event.target);
  };

  const handleFormSubmit = (event) => {
    let submit_data = event.target.value;
    let user_id = '0';
    POST({ submit_data, user_id });

    // TODO
  };

  return (
    <form>
      <input
        type="text"
        id="chatbot-message-input"
        className="input"
        onChange={handleChange}
      />

      <button type="submit" onSubmit={handleFormSubmit}>
        <IoMdSend />
      </button>
    </form>
  );
}
