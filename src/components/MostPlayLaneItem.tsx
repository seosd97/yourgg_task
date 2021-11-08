import { LaneStat } from '../../types';
import React from 'react';
import { LaneType } from '../constants';

interface Props {
  stat: LaneStat,
  onClick: (lane: LaneType) => void,
}

const MostPlayLaneItem: React.FC<Props> = ({
  stat,
  onClick = null,
}) => {
  return (
    <div>
      {stat.lane}
    </div>
  );
};

export default MostPlayLaneItem;
