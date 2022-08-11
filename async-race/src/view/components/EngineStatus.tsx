import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectTrack } from '../../model/feature/tracks';
import { storeSelectTracks } from '../../model/store';

import RacingServiceContext from '../RacingServiceContext';

interface EngineStatusProps {
  carId: number;
}
function EngineStatus({ carId }: EngineStatusProps) {
  const { startCar, stopCar } = useContext(RacingServiceContext);

  const tracksState = useSelector(storeSelectTracks);
  const isCarOnTrack = selectTrack(tracksState, carId) !== undefined;

  return (
    <div className="engine-status">
      <button className="engine-status__start" disabled={isCarOnTrack} onClick={() => startCar(carId)}>
        A
      </button>
      <button className="engine-status__stop" disabled={!isCarOnTrack} onClick={() => stopCar(carId)}>
        R
      </button>
    </div>
  );
}

export default EngineStatus;
