import { ChampionStat, LaneStat } from '../../types';
import React, { useCallback, useState } from 'react';

import { LaneType } from '../constants';
import MostPlayChampionItem from './MostPlayChampionItem';
import MostPlayLaneItem from './MostPlayLaneItem';
import { NextComponentType } from 'next';

interface Props {
  mostLanes: LaneStat[],
  mostChampions: ChampionStat[],
  onChangeValue?: (lane: LaneType, champion?: string) => void,
}

const MostPlayList: React.FC<Props> = ({
  mostLanes,
  mostChampions,
  onChangeValue = null,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>('Most_Lane_Item_0');

  const onClickLaneItem = useCallback((index: number, lane: LaneType) => {
    setSelectedItemId(`Most_Lane_Item_${index}`);

    if (onChangeValue != null) {
      onChangeValue(lane);
    }
  }, [onChangeValue]);

  const onClickChampItem = useCallback((index: number, lane: LaneType, champion: string) => {
    setSelectedItemId(`Most_Champion_Item_${index}`);

    if (onChangeValue != null) {
      onChangeValue(lane, champion);
    }
  }, [onChangeValue]);

  return (
    <div className="most-play-list-container flex-col">
      <div className="flex-row">
        <span className="most-play-list-col-title most-play-item-lane-text">최근 30경기</span>
        <span className="most-play-list-col-winrate most-play-item-lane-text">승률</span>
        <span className="most-play-list-col-sub-stat most-play-item-lane-text">인분</span>
        <span className="most-play-list-col-sub-stat most-play-item-lane-text">라인전</span>
        <span className="most-play-list-col-sub-stat most-play-item-lane-text">KDA</span>
      </div>
      <div>
        {
          mostLanes.map((stat: LaneStat, index: number) => {
            const id = `Most_Lane_Item_${index}`;
            return (
              <MostPlayLaneItem
                key={`Most_Lane_Item_${stat.lane}`}
                stat={stat}
                selected={selectedItemId === id}
                onClick={
                  (lane: LaneType) => {
                    onClickLaneItem(index, lane);
                  }
                }
              />
            );
          })
        }
        {
          mostChampions.map((stat: ChampionStat, index: number) => {
            const id = `Most_Champion_Item_${index}`;
            return (
              <MostPlayChampionItem
                key={`Most_Champ_Item_${stat.id}`}
                stat={stat}
                selected={selectedItemId === id}
                onClick={
                  (lane: LaneType, champion: string) => {
                    onClickChampItem(index, lane, champion);
                  }
                }
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default MostPlayList;
