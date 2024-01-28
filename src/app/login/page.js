"use client";

import styles from "./page.module.css";

import bg from "/public/background.png";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Link from "next/link";

export default function Login() {
  const [user, setUser] = useState({});

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // FLAG

  const handleSignin = async () => {
    const credentials = Realm.Credentials.emailPassword(email, password);

    const _user = await App.login(credientials);

    if (_user.id === App.currentUser.id) {
      setUser(_user);
      router.push("/dashboard");
    } else {
      console.error(error);
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
          position: "absolute",
          zIndex: -1,
          objectFit: "cover",
          objectPosition: "center",
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
            name="rembember"
            className={styles.check}
          />
          <label for="remember" className={styles.check}>
            {" "}
            Remember me
          </label>
        </span>

        <button onClick={handleSignin} disabled={loading}>
          Log in
        </button>
        <p className={styles.error}>
          {error ? "Incorrect username or password" : ""}
        </p>

        <a href="#" className={styles.forgot}>
          I forgot my password
        </a>
        <p>
          Don&rsquo;t have an account?{" "}
          <Link href="/register" style={{ textDecoration: "underline" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
