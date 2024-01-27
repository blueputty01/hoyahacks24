"use client";

import styles from "./page.module.css";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSignin = async () => {
    await signInWithEmailAndPassword(email, password);
    if (user) {
      router.push('/');
    } else {
      console.log(error);
    }
  };
  console.log(error);
  return (
    <div className={styles.login}>
      <div>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignin}>Log in</button>
        <input>
        type="checkbox"
        </input>
      </div>
    </div>
  );
}
