import { LaneType, MatchCategoryType } from './src/constants';

export interface Profile {
  name: string;
  role: number;
  laning: number;
  kda: number;
  winRate: number;
  lane: LaneType;
  mostLane: number;
  mostLanes: LaneStat[];
  mostChampions: ChampionStat[];
  matchCategory: MatchCategoryType;
}

export interface LaneStat {
  kda: number;
  lane: LaneType;
  laning: number;
  matchCount: number;
  pickRate: number;
  role: number;
  winRate: number;
}

export interface ChampionStat {
  id: number;
  key: string;
  imageUrl: string;
  name: string;
  kda: number;
  lane: LaneType;
  laning: number;
  matchCount: number;
  pickRate: number;
  role: number;
  winRate: number;
}

export interface DropdownOption {
  value: string,
  label: string,
}
