'use client';

import styles from './header.module.css';
import Link from 'next/link';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'utils/config';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [user, loading, error] = useAuthState(auth, {});

  return (
    <header>
      <Link href="/">SeCUREpod</Link>{' '}
      {pathname !== '/login' && (
        <Link href="/login" className={styles.login}>
          {user ? user.email : 'Log in'}
        </Link>
      )}
    </header>
  );
}
