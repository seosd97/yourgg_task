import Head from 'next/head';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DEFAULT_USER_NAME } from '../constants';

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${DEFAULT_USER_NAME}`);
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
