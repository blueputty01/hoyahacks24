"use client";

import styles from "./page.module.css";

import bg from "/public/background.png";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth } from "utils/config";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  return (
    <div className={styles.register}>
      <Image
        src={bg}
        alt=""
        fill
        sizes="100vw"
        style={{
          position: "absolute",
          zIndex: -1,
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <div>
        <h1>Register</h1>
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
        <button onClick={createUserWithEmailAndPassword}>Register</button>
      </div>
    </div>
  );
}
