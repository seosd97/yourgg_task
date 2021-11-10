import Head from 'next/head';
import type { NextPage } from 'next';

const Index: NextPage = () => (
  <div>
    <Head>
      <title>Not found</title>
      <meta name="description" content="your.gg interview task" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <span style={{ alignSelf: 'center' }}>소환사 정보를 찾을 수 없습니다.</span>
    </main>
  </div>
);

export default Index;
