import React, { useContext } from 'react';

import RacingServiceContext from '../RacingServiceContext';

interface EngineStatusProps {
  carId: number;
}
function EngineStatus({ carId }: EngineStatusProps) {
  const {
    startCar,
    stopCar
  } = useContext(RacingServiceContext);

  return (
    <div className='engine-status'>
      <button
        className='engine-status__start'
        onClick={() => startCar(carId)}>
          A
      </button>
      <button
        className='engine-status__stop'
        onClick={() => stopCar(carId)}>
          R
      </button>
    </div>
  )
}

export default EngineStatus;
