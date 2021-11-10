import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

import Head from 'next/head';
import { LaneType, MatchCategoryType } from '../constants';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import api from '../api';
import { Profile } from '../../types';
import MostPlayList from '../components/MostPlayList';
import MostItemSkeleton from '../components/MostItemSkeleton';
import MainStatSkeleton from '../components/MainStatSkeleton';

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
  const laneFilter = router?.query?.lane as LaneType ?? null;
  const championFilter = router?.query?.champion as string ?? null;

  const [
    matchTypeFilter,
    setMatchTypeFilter,
  ] = useState<MatchCategoryType>(MatchCategoryType.SoloRank);
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);
  const [, setIsUpdatingProfile] = useState<boolean>(false);

  useEffect(() => {
    setMatchTypeFilter(() => MatchCategoryType[matchTypeKey]);
  }, [matchTypeKey]);

  useEffect(() => {
    if (router.isReady) {
      setIsLoadingProfile(true);
      (async () => {
        const data: Profile = await api.profile.getUserProfile(userName, matchTypeFilter);
        setProfileData(data);
        setIsLoadingProfile(false);
      })();
    }
  }, [router.isReady, userName, matchTypeFilter]);

  const onChangeMostItem = useCallback(async (lane: LaneType, champion?: string) => {
    setIsUpdatingProfile(true);
    const data: Profile
      = await api.profile.getUserProfile(userName, matchTypeFilter, lane, champion);

    setProfileData(data);
    setIsUpdatingProfile(false);
  }, [userName, matchTypeFilter]);

  const isProfileLoaded = !isLoadingProfile && profileData;

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
          <section className="main-stat-container">
            {
              isProfileLoaded ? (
                <div>
                  <div className="main-stat-set flex-row">
                    <span className="stat-val">{profileData.role.toFixed(2)}</span>
                    <span className="stat-desc">인분</span>
                  </div>
                  <div className="main-stat-set flex-row">
                    <span className="stat-val">{`${profileData.laning.toFixed(1)}:${(10 - profileData.laning).toFixed(1)}`}</span>
                    <span className="stat-desc">라인전</span>
                  </div>
                  <div className="main-stat-set flex-row">
                    <span className="stat-val">{profileData.kda}</span>
                    <span className="stat-desc">KDA</span>
                  </div>
              </div>
              ) : <MainStatSkeleton />
            }
          </section>
          {
            isProfileLoaded ? (
              <MostPlayList
                mostLanes={profileData.mostLanes}
                mostChampions={profileData.mostChampions}
                selectedLane={laneFilter ?? profileData.lane}
                selectedChampion={championFilter}
                onChangeValue={onChangeMostItem}
              />
            ) : <MostItemSkeleton />
          }
      </main>
    </div>
  );
};

export default Profile;
