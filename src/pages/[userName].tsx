import { Fragment, useEffect, useMemo, useState } from 'react';

import Head from 'next/head';
import { LaneType, MatchCategoryType } from '../constants';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import api from '../api';
import { ChampionStat, LaneStat, Profile } from '../../types';
import MostPlayList from '../components/MostPlayList';

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
      
      <main className="main-container flex-col">
        <section>
          <h1 className="title-user-name">{profileData?.name ? profileData.name : userName}</h1>
          <div>{matchTypeFilter}</div>
        </section>
        {
          profileData ? (
            <Fragment>
              <section className="main-stat-container">
                <div>
                  <div className="main-stat-set flex-row">
                    <span className="main-stat-val">{profileData.role.toFixed(2)}</span>
                    <span className="main-stat-desc">인분</span>
                  </div>
                  <div className="main-stat-set flex-row">
                    <span className="main-stat-val">{`${profileData.laning.toFixed(1)}:${(10 - profileData.laning).toFixed(1)}`}</span>
                    <span className="main-stat-desc">라인전</span>
                  </div>
                  <div className="main-stat-set flex-row">
                    <span className="main-stat-val">{profileData.kda}</span>
                    <span className="main-stat-desc">KDA</span>
                  </div>
                </div>
              </section>
              <MostPlayList
                mostLanes={profileData.mostLanes}
                mostChampions={profileData.mostChampions}
              />
            </Fragment>
          ) : null
        }
      </main>
    </div>
  );
};

export default Profile;
