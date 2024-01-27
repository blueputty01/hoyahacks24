import Image from 'next/image';
import styles from './page.module.css';

import Input from 'components/Input';

export const messages = [
  {
    id: 0,
    content:
      "Welcome to SecurePod! this is a lot of extra text that isn't necessary but hopefully causes a line overflow. A:WFLKJ ASDLFKJ WEPOFIJE WFPOIEWFKJ WES?LFKJ A:LKFJ EWPFOIE JFas",
  },
  {
    id: 1,
    content: 'Hello',
  },
];

export default function Home() {
  const messages_html = messages.map((message, idx) => {
    return (
      <div
        key={message.id}
        className={message.id === 0 ? 'message bot' : 'message user'}
      >
        {message.content}
      </div>
    );
  });

  return (
    <main className={styles.main}>
      <div className={styles.chatbox}>
        <div className={styles.scrollbox}>{messages_html}</div>
        <Input />
      </div>
    </main>
  );
}
