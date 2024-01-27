"use client";
import Image from "next/image";
import styles from "./page.module.css";

import Input from "components/Input";

export const messages = [];

export default function Home() {
  async function postData(message, userId) {
    messages.push({ id: 0, content: message });

    const url = "localhost:3000/api/llm/route";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ message, userId }),
      });

      if (response.ok) {
        messages.push({
          id: 0,
          content: (await response.json()).result.response,
        });

        console.log(response);
      } else {
      }
    } catch (ex) {
      messages.push({
        id: 0,
        content: ex,
      });
    }
  }

  const handleFormSubmit = (message) => {
    postData(submit_data, 0);
    // TODO
  };

  const messages_html = messages.map((message, idx) => {
    return (
      <div
        key={message.id}
        className={message.id === 0 ? "message bot" : "message user"}
      >
        {message.content}
      </div>
    );
  });

  return (
    <main className={styles.main}>
      <div>
        <h1>Home</h1>
      </div>

      <div className={styles.chatbox}>
        <div className={styles.scrollbox}>{messages_html}</div>
        <Input />
      </div>
    </main>
  );
}
