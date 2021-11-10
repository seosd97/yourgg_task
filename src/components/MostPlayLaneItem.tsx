import React, { useCallback } from 'react';

import { LaneStat } from '../../types';
import { LaneType } from '../constants';

interface Props {
  stat: LaneStat,
  selected?: boolean,
  onClick?: (lane: LaneType) => void,
}

const MostPlayLaneItem: React.FC<Props> = ({
  stat,
  selected = false,
  onClick = null,
}) => {
  const onClickItem = useCallback(() => {
    if (onClick != null) {
      onClick(stat.lane);
    }
  }, [onClick, stat.lane]);

  return (
    <div
      id={`most-lane-item-${stat.lane}`}
      className={`most-play-item-container flex-row ${selected ? 'selected' : ''}`}
      onClick={onClickItem}
    >
      <div className="most-item-icon">
        <img src={`/images/${stat.lane}.png`} alt="lane_icon" width={20} height={20} className="img-border" />
      </div>
      <span className="most-play-item-main-col flex-col">
        <span className="col-lane-text">{stat.lane}</span>
        <span className="col-match-count-text">{`${stat.matchCount} 경기`}</span>
      </span>
      <span className="col-winrate col-stat-text">{`${stat.winRate.toFixed(0)}%`}</span>
      <span className="col-sub-stat col-stat-text">{stat.role.toFixed(2)}</span>
      <span className="col-sub-stat col-stat-text">{stat.laning.toFixed(1)}</span>
      <span className="col-sub-stat col-stat-text">{stat.kda}</span>
    </div>
  );
};

export default MostPlayLaneItem;
