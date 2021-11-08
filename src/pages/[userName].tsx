import { Fragment, useEffect, useMemo, useState } from 'react';

import Head from 'next/head';
import { LaneType, MatchCategoryType } from '../constants';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import api from '../api';
import { Profile } from '../../types';

const Profile: NextPage = () => {
  const router = useRouter();

  const userName = router?.query?.userName as string;
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
  const [selectedLane, setSelectedLane] = useState<LaneType>(LaneType.Top);
  const [selectedChamp, setSelectedChamp] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<Profile | null>(null);

  useEffect(() => {
    setMatchTypeFilter(() => MatchCategoryType[matchTypeKey]);
  }, [matchTypeKey]);

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        const data: Profile = await api.profile.getUserProfile(userName, matchTypeFilter);
        setProfileData(data);
      })();
    }
  }, [router.isReady]);

  return (
    <div>
      <Head>
        <title>{`profile - ${userName}`}</title>
        <meta name="description" content={`your.gg interview task - ${userName} profile`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <b>{profileData?.name ? profileData.name : userName}</b>
      <div>{matchTypeFilter}</div>
      {
        profileData ? (
          <Fragment>

          </Fragment>
        ) : null
      }
    </div>
  );
};

export default Profile;
