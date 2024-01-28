"use client";
import styles from "./page.module.css";

import Input from "components/Input";

const messages = [
  {
    id: 0,
    content: "hi I'm a message",
  },
  {
    id: 0,
    content: "hi I'm a message",
  },
  {
    id: 0,
    content: "hi I'm a message",
  },
  {
    id: 0,
    content: "hi I'm a message",
  },
  {
    id: 1,
    content: "hi I'm a message",
  },
  {
    id: 0,
    content: "hi I'm a message",
  },
  {
    id: 0,
    content: "hi I'm a message",
  },
  {
    id: 0,
    content: "hi I'm a message",
  },
  {
    id: 0,
    content: "hi I'm a message",
  },
];

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
    messages.push({
      id: 0,
      content: "message procwessing",
    });
    postData(submit_data, 0);
    messages.push({
      id: 0,
      content: "message sent",
    });
  };

  var counter = 0;

  const messages_html = messages.map((message, idx) => {
    return (
      <div
        key={counter++}
        className={message.id != 0 ? "message bot" : "message user"}
      >
        {message.content}
      </div>
    );
  });

  return (
    <main className={styles.main}>
      <div className={styles.chatbox}>
        <div className={styles.scrollbox}>{messages_html}</div>
        <Input handleFormSubmit={handleFormSubmit} />
      </div>
    </main>
  );
}
