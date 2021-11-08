import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>your.gg interview task</title>
        <meta name="description" content="your.gg interview task - hide on bush stat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <b>HIDE ON BUSH</b>
      </main>
    </div>
  );
};

export default Home;
