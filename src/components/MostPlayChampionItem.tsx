import { ChampionStat } from '../../types';
import { LaneType } from '../constants';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const onClickItem = useCallback(() => {
    if (onClick != null) {
      onClick(stat.lane, stat.key);
    }
  }, [onClick, stat]);

  return (
    <Link
      href={`${router.basePath}/${router.query.userName}/?champion=${stat.key}&lane=${stat.lane}`}
      shallow
    >
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
        <span className="most-play-item-main flex-col">
          <span className="most-play-item-lane-text">{stat.name}</span>
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

export default MostPlayChampionItem;
