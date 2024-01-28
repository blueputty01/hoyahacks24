'use client';
import styles from './page.module.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import Input from 'components/Input';
import { useState, useEffect } from 'react';
import { auth } from 'utils/config';

export default function Home() {
  const [user, loading, error] = useAuthState(auth, {});
  const [messages, setMessages] = useState([]);
  const API_URL = '/api/llm';

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        const response = await fetch(`${API_URL}?uid=${user.uid}`);
        const [result] = (await response.json()).result.response;

        if (response.ok) {
          setMessages((oldMessages) => [...oldMessages, result.content]);
        }
      } catch (ex) {
        console.error(ex);
      }
    }

    fetchData();
  }, [user]);

  const uid = user?.uid;

  async function postData(message, userId) {
    messages.push({ user_id: uid, content: message });

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ message, userId }),
      });

      const [result] = (await response.json()).result.response;

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
              <div key={idx}>
                <span className={styles.message}>{message.message}</span>
                <span className={styles.response}>{message.response}</span>
              </div>
            );
          })}
        </div>
        <Input handleFormSubmit={handleFormSubmit} disabled={isLoading} />
      </div>
    </main>
  );
}
