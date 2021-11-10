import { ChampionStat, LaneStat } from '../../types';
import React, { useCallback } from 'react';

import { LaneType } from '../constants';
import MostPlayChampionItem from './MostPlayChampionItem';
import MostPlayLaneItem from './MostPlayLaneItem';

interface Props {
  mostLanes: LaneStat[],
  mostChampions: ChampionStat[],
  selectedLane: LaneType,
  selectedChampion: string | null,
  onChangeValue?: (lane: LaneType, champion?: string) => void,
}

const buildItemKey = (lane: LaneType, champion?: string | null): string => {
  let key = lane.toString();
  if (champion != null) {
    key = key.concat(`_${champion}`);
  }
  return key;
};

const MostPlayList: React.FC<Props> = ({
  mostLanes,
  mostChampions,
  selectedLane,
  selectedChampion = null,
  onChangeValue = null,
}) => {
  const selectedItemId = buildItemKey(selectedLane, selectedChampion);

  const onClickItem = useCallback((lane: LaneType, champion?: string) => {
    if (onChangeValue != null) {
      onChangeValue(lane, champion);
    }
  }, [onChangeValue]);

  return (
    <div className="most-play-list-container flex-col">
      <div className="most-play-list-header flex-row">
        <span className="col-title col-text">최근 30경기</span>
        <span className="col-winrate col-text">승률</span>
        <span className="col-sub-stat col-text">인분</span>
        <span className="col-sub-stat col-text">라인전</span>
        <span className="col-sub-stat col-text">KDA</span>
      </div>
      <div>
        {
          mostLanes.map((stat: LaneStat) => {
            const id = buildItemKey(stat.lane);
            return (
              <MostPlayLaneItem
                key={`Most_Play_Item_${stat.lane}`}
                stat={stat}
                selected={selectedItemId === id}
                onClick={onClickItem}
              />
            );
          })
        }
        {
          mostChampions.map((stat: ChampionStat) => {
            const id = buildItemKey(stat.lane, stat.key);
            return (
              <MostPlayChampionItem
                key={`Most_Champ_Item_${stat.id}`}
                stat={stat}
                selected={selectedItemId === id}
                onClick={onClickItem}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default MostPlayList;
