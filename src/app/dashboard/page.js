'use client';
import styles from './page.module.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import Input from 'components/Input';
import { useState, useEffect } from 'react';
import { auth } from 'utils/config';

export default function Home() {
  const [user, loading, error] = useAuthState(auth, {});
  const uid = user?.uid;
  const [messages, setMessages] = useState([]);
  const API_URL = '/api/llm';

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        const response = await fetch(`${API_URL}?uid=${user.uid}`);
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
        body: JSON.stringify({ message, userId: uid }),
      });

      const json = await response.json();

      const [result] = json.result.response;

      if (json.success) {
        setMessages((oldMessages) => [...oldMessages, result.content]);
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
        <div className={styles.scrollbox}>
          {messages.map((message, idx) => {
            return (
              <div key={idx}>
                <span className={styles.message}>{message.message}</span>
                <span className={styles.response}>{message.response}</span>
              </div>
            );
          })}
        </div>
        <Input
          handleFormSubmit={handleFormSubmit}
          disabled={isLoading}
          className={styles.input}
        />
      </div>
    </main>
  );
}
