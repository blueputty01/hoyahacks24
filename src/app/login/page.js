'use client';

import styles from './page.module.css';

import bg from '/public/background.png';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Link from 'next/link';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID });

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSignin = async () => {
    const credentials = Realm.Credentials.emailPassword(email, password);

    try {
      const _user = await app.logIn(credentials);
      if (_user.id === app.currentUser.id) {
        // after sign in
        router.refresh();
        router.replace('/dashboard');
      } else {
        console.error(error);
        setError(error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.login}>
      <Image
        src={bg}
        alt=""
        fill
        sizes="100vw"
        style={{
          position: 'absolute',
          zIndex: -1,
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <div>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          className={styles.text}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className={styles.text}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>
          <input
            type="checkbox"
            id="remember"
            name="remember"
            className={styles.check}
          />
          <label htmlFor="remember" className={styles.check}>
            {' '}
            Remember me
          </label>
        </span>

        <button onClick={handleSignin}>Log in</button>
        <a href="#" className={styles.forgot}>
          I forgot my password
        </a>
        <p>
          Don&rsquo;t have an account?{' '}
          <Link href="/register" style={{ textDecoration: 'underline' }}>
            Register
          </Link>
          {error && <p className={styles.error}>{error.split(':')[2]}</p>}
        </p>
      </div>
    </div>
  );
}
