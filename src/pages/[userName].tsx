import { useEffect, useMemo, useState } from 'react';

import Head from 'next/head';
import { MatchCategoryType } from '../constants';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Profile: NextPage = () => {
  const router = useRouter();

  const { userName } = router.query;
  const matchTypeKey: keyof typeof MatchCategoryType = useMemo(() => {
    const key = router?.query?.matchType as keyof typeof MatchCategoryType;
    if (key == null || !Object.keys(MatchCategoryType).includes(key)) {
      return 'SoloRank';
    }
    return key;
  }, [router.query.matchType]);

  const [
    matchTypeFilter,
    setMatchTypeFilter,
  ] = useState<MatchCategoryType>(MatchCategoryType.SoloRank);

  useEffect(() => {
    setMatchTypeFilter(() => MatchCategoryType[matchTypeKey]);
  }, [matchTypeKey]);

  return (
    <div>
      <Head>
        <title>{`profile - ${userName}`}</title>
        <meta name="description" content={`your.gg interview task - ${userName} profile`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <b>{userName}</b>
      <div>{matchTypeFilter}</div>
    </div>
  );
};

export default Profile;
