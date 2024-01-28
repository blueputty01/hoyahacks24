"use client";
import styles from "./page.module.css";

import Input from "components/Input";
import { useState, useEffect, useMemo } from "react";
import { Fragment } from "react";

import * as Realm from "realm-web";
const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID });

export default function Home() {
  const user = useMemo(() => {
    const id = Object.keys(app.allUsers);
    return app.allUsers[id];
  }, []);

  const userId = user?.id;

  const [messages, setMessages] = useState([]);
  const API_URL = "/api/llm";

  useEffect(() => {
    async function fetchData() {
      if (!userId) return;

      try {
        const response = await fetch(`${API_URL}?uid=${userId}`);
        const result = (await response.json()) ?? [];

        if (response.ok) {
          setMessages(result);
        }
      } catch (ex) {
        console.error(ex);
      }
    }

    fetchData();
  }, [userId]);

  async function postData(message) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ message, userId }),
      });

      const json = await response.json();

      const llmResponse = json.result.response;

      if (json) {
        setMessages((oldMessages) => {
          return [...oldMessages, { message, response: llmResponse }];
        });
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (message) => {
    setIsLoading(true);
    postData(message);
    setIsLoading(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.chatbox}>
        {messages.length ? (
          messages.map((message) => {
            return (
              <Fragment key={message._id ?? message.message.substring(0, 5)}>
                <div className={styles.message}>{message.message}</div>
                <div className={styles.response}>{message.response}</div>
              </Fragment>
            );
          })
        ) : (
          <div>
            Hello! I&rsquo;m SeCUREPod, a digital assistant who can provide
            understandable, actionable personal security and digital literacy
            guidance. <br></br>This is a free [beta] version and may be subject
            to time-outs in situations with poor internet. You can find me at{" "}
            <a href="https://hoyahacks24.vercel.app/">
              https://hoyahacks24.vercel.app/
            </a>
            .{" "}
          </div>
        )}
      </div>
      <div className={styles.prompt}>
        <Input handleFormSubmit={handleFormSubmit} isDisabled={isLoading} />
      </div>
    </main>
  );
}
