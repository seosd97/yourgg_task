import { Fragment, useEffect, useMemo, useState } from 'react';

import Head from 'next/head';
import { LaneType, MatchCategoryType } from '../constants';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import api from '../api';
import { ChampionStat, LaneStat, Profile } from '../../types';

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
      
      <header>
        <h1 className="title-name">{profileData?.name ? profileData.name : userName}</h1>
        <div>{matchTypeFilter}</div>
      </header>
      <main>
        {
          profileData ? (
            <Fragment>
              <div>
                <div><span>{profileData.role.toFixed(2)}</span>인분</div>
                <div><span>{`${profileData.laning.toFixed(1)}:${(10 - profileData.laning).toFixed(1)}`}</span>라인전</div>
                <div><span>{profileData.kda}</span>KDA</div>
              </div>
            </Fragment>
          ) : null
        }
      </main>
    </div>
  );
};

export default Profile;
