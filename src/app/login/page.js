"use client";

import styles from './page.module.css';

import bg from '/public/background.png';

import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from 'utils/config';
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSignin = async () => {
    await signInWithEmailAndPassword(email, password);
    if (user) {
      router.push("/");
    } else {
      console.log(error);
    }
  };
  console.log(error);
  return (
    <div className={styles.login}>
      <Image
        src={bg}
        alt=""
        layout="fill"
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
        <button onClick={handleSignin}>Log in</button>
        <input
          type="checkbox"
          id="remember"
          name="rembember"
          className={styles.check}
        />
        <label for="remember" className={styles.check}>
          {" "}
          Remember me
        </label>
      </div>
    </div>
  );
}
