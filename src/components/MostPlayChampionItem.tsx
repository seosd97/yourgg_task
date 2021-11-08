import { ChampionStat } from '../../types';
import { LaneType } from '../constants';
import React from 'react';

interface Props {
  stat: ChampionStat,
  onClick?: (lane: LaneType, championKey: string) => void,
}

const MostPlayChampionItem: React.FC<Props> = ({
  stat,
  onClick = null,
}) => {
  return (
    <div>
      {`${stat.lane} - ${stat.name}`}
    </div>
  );
};

export default MostPlayChampionItem;
