import { NextComponentType } from 'next';
import React from 'react';
import { ChampionStat, LaneStat } from '../../types';
import { LaneType } from '../constants';
import MostPlayChampionItem from './MostPlayChampionItem';
import MostPlayLaneItem from './MostPlayLaneItem';

interface Props {
  mostLanes: LaneStat[],
  mostChampions: ChampionStat[],
  onChangValue?: (lane: LaneType, champion: string) => void,
}

const MostPlayList: React.FC<Props> = ({
  mostLanes,
  mostChampions,
  onChangValue = null,
}) => {
  return (
    <div className="flex-col">
      <div className="flex-row">
        <span>최근 30경기</span>
        <span>승률</span>
        <span>인분</span>
        <span>라인전</span>
        <span>KDA</span>
      </div>
      <div>
        {
          mostLanes.map((stat: LaneStat) => (
            <MostPlayLaneItem key={`Most_Lane_Item_${stat.lane}`} stat={stat} />
          ))
        }
        {
          mostChampions.map((stat: ChampionStat) => (
            <MostPlayChampionItem key={`Most_Champ_Item_${stat.id}`} stat={stat} />
          ))
        }
      </div>
    </div>
  );
};

export default MostPlayList;
