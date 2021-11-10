import Head from 'next/head';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index: NextPage = () => (
  <div>
    <Head>
      <title>Not found</title>
      <meta name="description" content="your.gg interview task" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      정보를 찾을 수 없습니다.
    </main>
  </div>
);

export default Index;
