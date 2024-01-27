import Image from "next/image";
import styles from "./page.module.css";

import Input from 'components/Input'

const messages = 
[
  {
    id: 0,
    content: "Welcome to SecurePod! this is a lot of extra text that isn't necessary but hopefully causes a line overflow. A:WFLKJ ASDLFKJ WEPOFIJE WFPOIEWFKJ WES?LFKJ A:LKFJ EWPFOIE JFas"
  },
  {
    id: 1,
    content: "Hello" 
  }
]

export default function Home() {
  const messages_html = messages.map((message, idx) => {
    return( <div key={message.id} className={message.id === 0 ? "message bot" : "message user"}>{message.content}</div> );
  });
  
  return (
    <main className={styles.main}>
      <div><h1>Home</h1></div>

      <div className="chatbox">
        <div className="scrollbox">
          {messages_html}
        </div>
        {/* <Input
          onChange={handleChange}
        /> */}
      </div>


      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
