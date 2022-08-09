import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectTrack } from '../../model/feature/tracks';
import { storeSelectTracks } from '../../model/store';
import AppContext from '../AppContext';

interface EngineStatusProps {
  carId: number;
}
function EngineStatus({ carId }: EngineStatusProps) {
  const state = useSelector(storeSelectTracks);
  const trackParams = selectTrack(state, carId);

  const {
    handleCarStart,
    handleCarReset
  } = useContext(AppContext);
  if (trackParams === undefined) {

  }
  return (
    <div className='engine-status'>
      <button
        className='engine-status__start'
        onClick={() => handleCarStart(carId)}>
          A
      </button>
      <button
        className='engine-status__stop'
        onClick={() => handleCarReset(carId)}>
          R
      </button>
    </div>
  )
}

export default EngineStatus;