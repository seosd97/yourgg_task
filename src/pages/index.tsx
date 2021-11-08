import Head from 'next/head';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>your.gg interview task</title>
        <meta name="description" content="your.gg interview task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      </main>
    </div>
  );
};

export default Index;
