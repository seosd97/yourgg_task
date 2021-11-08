import Head from 'next/head';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/hide on bush');
  }, []);

  return (
    <div>
      <Head>
        <title>your.gg interview task</title>
        <meta name="description" content="your.gg interview task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Index;
