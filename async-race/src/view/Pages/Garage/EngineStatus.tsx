import React from 'react';
import { useSelector } from 'react-redux';

import { storeSelectTracks } from '../../../model/store';
import { selectTrack } from '../../../model/feature/tracks';

import DIContainer from '../../../DIContainer';
import { TYPES } from '../../../InjectionTypes';

import IRacingService from '../../../services/interfaces/IRacingService';

interface EngineStatusProps {
  carId: number;
}

function EngineStatus({ carId }: EngineStatusProps) {
  const racingService = DIContainer.get<IRacingService>(TYPES.RacingService);

  const tracksState = useSelector(storeSelectTracks);
  const isCarOnTrack = selectTrack(tracksState, carId) !== undefined;

  return (
    <div className="engine-status">
      <button
        className="engine-status__start"
        disabled={isCarOnTrack}
        onClick={() => racingService.startCar(carId)}>
        A
      </button>
      <button
        className="engine-status__stop"
        disabled={!isCarOnTrack}
        onClick={() => racingService.stopCar(carId)}>
        R
      </button>
    </div>
  );
}

export default EngineStatus;
