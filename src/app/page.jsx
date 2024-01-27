import { FaUserLock } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/login" className={styles.description}>
        Log in
      </Link>

      <div className={styles.center}>
        <FaUserLock size={200} className={styles.logo} />
        <span className={styles.text}>SeCUREPod</span>
      </div>

      <div className={styles.grid}>
        <a
          href="#"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about SeCUREpod.</p>
        </a>

        <a
          href="#"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Chat <span>-&gt;</span>
          </h2>
          <p>Chat with other users</p>
        </a>

        <a
          href="#"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Impact <span>-&gt;</span>
          </h2>
          <p>Explore our impact.</p>
        </a>

        <a
          href="#"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Leaderboard <span>-&gt;</span>
          </h2>
          <p>Compare how you&rsquo;re doing compared to other users.</p>
        </a>
      </div>
    </main>
  );
}
