'use client';

import styles from './header.module.css';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      <Link href="/">SeCUREpod</Link>{' '}
      {pathname !== '/login' && (
        <Link href="/login" className={styles.login}>
          Log in
        </Link>
      )}
    </header>
  );
}
