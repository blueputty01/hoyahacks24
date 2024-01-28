"use client";
import styles from "./page.module.css";

import Input from "components/Input";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);

  async function postData(message, userId) {
    messages.push({ user_id: "ayang130@terpmail.umd.edu", content: message });
    const url = "/api/llm";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ message, userId }),
      });

      const [result] = (await response.json()).result.response;

      console.log(result);

      if (response.ok) {
        setMessages((oldMessages) => [...oldMessages, result.content]);
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  console.log(messages);

  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (message) => {
    setIsLoading(true);
    postData(message, 0);
    setIsLoading(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.chatbox}>
        <div className={styles.scrollbox}>
          {messages.map((message, idx) => {
            return (
              <div
                key={idx}
                className={idx % 2 == 0 ? "message bot" : "message user"}
              >
                {message}
              </div>
            );
          })}
        </div>
        <Input handleFormSubmit={handleFormSubmit} disabled={isLoading} />
      </div>
    </main>
  );
}
