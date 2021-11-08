export interface Profile {
  name: string;
  role: number;
  laning: number;
  kda: number;
  winRate: number;
  lane: string;
  mostLane: number;
  mostLanes: LaneStat[];
  mostChampions: ChampionStat[];
  matchCategory: string;
}

export interface LaneStat {
  kda: number;
  lane: string;
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
  lane: string;
  laning: number;
  matchCount: number;
  pickRate: number;
  role: number;
  winRate: number;
}
