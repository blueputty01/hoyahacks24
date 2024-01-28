'use client';
import styles from './page.module.css';

import Input from 'components/Input';
import { useState, useEffect, useMemo } from 'react';
import { Fragment } from 'react';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID });

export default function Home() {
  const { id: user } = useMemo(() => {
    const id = Object.keys(app.allUsers);
    return app.allUsers[id];
  }, []);

  const [messages, setMessages] = useState([]);
  const API_URL = '/api/llm';

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        const response = await fetch(`${API_URL}?uid=${user}`);
        const result = (await response.json()) ?? [];

        if (response.ok) {
          setMessages(result);
        }
      } catch (ex) {
        console.error(ex);
      }
    }

    fetchData();
  }, [user]);

  async function postData(message) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ message, userId: user }),
      });

      const json = await response.json();

      if (json) {
        setMessages((oldMessages) => {
          console.log(oldMessages);
          console.log(result);
          return [...oldMessages, { message, response: json }];
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
        {messages.map((message) => {
          return (
            <Fragment key={message._id}>
              <div className={styles.message}>{message.message}</div>
              <div className={styles.response}>{message.response}</div>
            </Fragment>
          );
        })}
      </div>
      <div className={styles.prompt}>
        <Input handleFormSubmit={handleFormSubmit} disabled={isLoading} />
      </div>
    </main>
  );
}
