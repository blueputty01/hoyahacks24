"use client";

import styles from "./page.module.css";

import bg from "/public/background.png";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import * as Realm from "realm-web";
const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

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
        <button
          onClick={async () => {
            try {
              await app.emailPasswordAuth.registerUser({ email, password });
              router.push("/login");
            } catch (error) {
              setError(error.message);
            }
          }}
        >
          Register
        </button>
        <p>
          Already have an account?{" "}
          <Link href="/login" style={{ textDecoration: "underline" }}>
            Login
          </Link>
        </p>
        {error && <p className={styles.error}>{error.split(":")[2]}</p>}
      </div>
    </div>
  );
}
