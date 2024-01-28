"use client";
import { FaUserLock } from "react-icons/fa";
import styles from "./header.module.css";
import Link from "next/link";
import { auth } from "utils/config";
import { useAuthState } from "react-firebase-hooks/auth";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [user, loading, error] = useAuthState(auth, {});
  console.log(user);

  return (
    <header>
      <Link href="/">
        {" "}
        <FaUserLock size={20} className={styles.logo} />
      </Link>
      <Link href="/">
        <b>SeCUREpod</b>
      </Link>{" "}
      {pathname !== "/login" && (
        <Link href="/login" className={styles.login}>
          {user ? user.email : "Log in"}
        </Link>
      )}
    </header>
  );
}
