import { API_ENDPOINT, LaneType, MatchCategoryType } from '../constants';

import { Profile } from '../../types';
import axios from 'axios';

const getUserProfile = async (
  name: string,
  matchCategory: MatchCategoryType,
  lane?: LaneType,
  champion?: string
): Promise<Profile> => {
  const params = {
    matchCategory,
    ...(lane ? { lane: lane.toString() } : {}),
    ...(champion ? { champion } : {}),
  };

  const res = await axios.get<Profile>(`${API_ENDPOINT}/${name}`, { params });

  return {
    name: res.data.name,
    role: res.data.role,
    laning: res.data.laning,
    kda: res.data.kda,
    winRate: res.data.winRate,
    lane: res.data.lane,
    mostLane: res.data.mostLane,
    mostLanes: res.data.mostLanes,
    mostChampions: res.data.mostChampions,
    matchCategory: res.data.matchCategory,
  };
};

export default {
  getUserProfile,
};
