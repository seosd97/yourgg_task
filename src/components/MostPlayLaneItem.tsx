import React, { EventHandler, MouseEventHandler, useCallback } from 'react';

import Image from 'next/image';
import { LaneStat } from '../../types';
import { LaneType } from '../constants';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const onClickItem = useCallback(() => {
    if (onClick != null) {
      onClick(stat.lane);
    }
  }, [onClick, stat.lane]);

  return (
    <Link
      href={`${router.basePath}/${router.query.userName}/?&lane=${stat.lane}`}
      shallow
    >
      <div
        id={`most-lane-item-${stat.lane}`}
        className={`most-play-item-container flex-row ${selected ? 'selected' : ''}`}
        onClick={onClickItem}
      >
        <div className="most-item-icon">
          <img src={`/images/${stat.lane}.png`} alt="lane_icon" width={20} height={20} className="img-border" />
        </div>
        <span className="most-play-item-main flex-col">
          <span className="most-play-item-lane-text">{stat.lane}</span>
          <span className="most-play-item-games-text">{`${stat.matchCount} 경기`}</span>
        </span>
        <span className="most-play-item-winrate">{`${stat.winRate.toFixed(0)}%`}</span>
        <span className="most-play-item-sub-stat">{stat.role.toFixed(2)}</span>
        <span className="most-play-item-sub-stat">{stat.laning.toFixed(1)}</span>
        <span className="most-play-item-sub-stat">{stat.kda}</span>
      </div>
    </Link>
  );
};

export default MostPlayLaneItem;
