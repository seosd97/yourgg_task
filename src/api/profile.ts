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
    ...(lane ? { lane } : {}),
    ...(champion ? { champion } : {}),
  };

  const res = await axios.get<Profile>(`${API_ENDPOINT}/${name}`, { params });

  return res.data;
};

export default {
  getUserProfile,
};
