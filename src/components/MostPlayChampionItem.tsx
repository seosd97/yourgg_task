import React, { useCallback } from 'react';

import { ChampionStat } from '../../types';
import { LaneType } from '../constants';

interface Props {
  stat: ChampionStat,
  selected?: boolean,
  onClick?: (lane: LaneType, championKey: string) => void,
}

const MostPlayChampionItem: React.FC<Props> = ({
  stat,
  selected = false,
  onClick = null,
}) => {
  const onClickItem = useCallback(() => {
    if (onClick != null) {
      onClick(stat.lane, stat.key);
    }
  }, [onClick, stat]);

  return (
    <div
      id={`most-champ-item-${stat.key}-${stat.lane}`} 
      className={`most-play-item-container flex-row ${selected ? 'selected' : ''}`}
      onClick={onClickItem}
    >
      <div className="most-item-icon">
        <img src={stat.imageUrl} alt="lane_icon" width={32} height={32} className="img-border" />
        <span className="most-item-sub-icon">
          <img src={`/images/${stat.lane}.png`} alt="lane_icon" width={10} height={10} className="invert-img"/>
        </span>
      </div>
      <span className="most-play-item-main-col flex-col">
        <span className="col-lane-text">{stat.name}</span>
        <span className="col-match-count-text">{`${stat.matchCount} 경기`}</span>
      </span>
      <span className="col-winrate col-stat-text">{`${stat.winRate.toFixed(0)}%`}</span>
      <span className="col-sub-stat col-stat-text">{stat.role.toFixed(2)}</span>
      <span className="col-sub-stat col-stat-text">{stat.laning.toFixed(1)}</span>
      <span className="col-sub-stat col-stat-text">{stat.kda}</span>
    </div>
  );
};

export default MostPlayChampionItem;
