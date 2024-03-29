'use client';
import { FaUserLock } from 'react-icons/fa';
import styles from './header.module.css';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

import * as Realm from 'realm-web';
import { useEffect, useState } from 'react';
const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID });

export default function Header() {
  const pathname = usePathname();

  const [user, setUser] = useState('Log in');

  useEffect(() => {
    const id = Object.keys(app.allUsers);
    const user = app.allUsers[id];
    const email = user?._profile?.data?.email;
    setUser(email);
  }, [user]);

  return (
    <header>
      <Link href="/">
        {' '}
        <FaUserLock size={20} className={styles.logo} />
      </Link>
      <Link href="/">
        <b>SeCUREpod</b>
      </Link>{' '}
      {pathname !== '/login' && (
        <Link href="/login" className={styles.login}>
          {user ? user.toString() : 'Log in'}
        </Link>
      )}
    </header>
  );
}
