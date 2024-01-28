'use client';
import { FaUserLock } from 'react-icons/fa';
import styles from './header.module.css';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return <header></header>;
}
