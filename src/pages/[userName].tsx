import { useCallback, useEffect, useMemo, useState } from 'react';

import Head from 'next/head';
import { LaneType, MatchCategoryType } from '../constants';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import api from '../api';
import { DropdownOption, Profile } from '../../types';
import MostPlayList from '../components/MostPlayList';
import MostItemSkeleton from '../components/MostItemSkeleton';
import MainStatSkeleton from '../components/MainStatSkeleton';
import Dropdown from '../components/Dropdown';

const matchTypeOptions = Object.values(MatchCategoryType).map((val) => ({
  value: val,
  label: val,
}));

const Profile: NextPage = () => {
  const router = useRouter();

  const userName = router?.query?.userName as string;
  const matchTypeFilter: MatchCategoryType = useMemo(() => {
    const key = router?.query?.matchType as keyof typeof MatchCategoryType;
    if (key == null || !Object.keys(MatchCategoryType).includes(key)) {
      return MatchCategoryType.SoloRank;
    }
    return MatchCategoryType[key];
  }, [router.query.matchType]);
  const laneFilter = router?.query?.lane as LaneType ?? null;
  const championFilter = router?.query?.champion as string ?? null;

  const [profileData, setProfileData] = useState<Profile | null>(null);

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        try {
          const data: Profile
          = await api.profile.getUserProfile(userName, matchTypeFilter, laneFilter, championFilter);
          
          setProfileData(data);
        } catch (err) {
          router.replace('/404');
        }
      })();
    }
  }, [router.isReady, userName, matchTypeFilter, laneFilter, championFilter]);

  const onChangeMostItem = useCallback(async (lane: LaneType, champion?: string) => {
    const params = {
      ...(router?.query?.matchType != null ? { matchType: router.query.matchType } : {}),
      lane: lane.toString(),
      ...(champion != null ? { champion } : {}),
    };

    router.push({
      pathname: `/${userName}`,
      query: params,
    },
    undefined,
    { shallow: true });
  }, [router?.query, userName]);

  const onChangeMatchType = useCallback((option: DropdownOption) => {
    const params = {
      matchType: option.value,
      ...(router?.query?.champion != null ? { champion: router.query.champion } : {}),
      ...(router?.query?.lane != null ? { lane: router.query.lane } : {}),
    };
    
    setProfileData(null);
    router.push({
      pathname: `/${userName}`,
      query: params,
    },
    undefined,
    { shallow: true });
  }, [router?.query, userName]);

  const isProfileLoaded = profileData != null;

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
          <Dropdown
            options={matchTypeOptions}
            value={matchTypeFilter}
            isDisabled={!isProfileLoaded}
            onChange={onChangeMatchType}
          />
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
