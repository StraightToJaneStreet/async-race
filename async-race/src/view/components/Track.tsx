import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { Car } from '../../core/Car';
import { selectTrack } from '../../model/feature/tracks';
import { storeSelectTracks } from '../../model/store';

import CarServiceContext from '../CarServiceContext';

import Button from './Button';
import CarComponent from './Car';
import EngineStatus from './EngineStatus';

interface TrackProps {
  car: Car;
}

const Track = ({ car }: TrackProps) => {
  const { deleteCar, selectCarForUpdate } = useContext(CarServiceContext);

  const state = useSelector(storeSelectTracks);
  const trackParams = selectTrack(state, car.id);

  const trackProgress = trackParams?.completedTrackPercent ?? 0;

  return (
    <div className="track">
      <div className="track__header">
        <Button label="Select" small handleClick={() => selectCarForUpdate(car.id)} />
        <Button label="Remove" small handleClick={() => deleteCar({ id: car.id })} />
        <span className="track__car-name">{car.name}</span>
      </div>
      <div className="track__content">
        <EngineStatus carId={car.id} />
        <div className="track__road">
          <CarComponent color={car.color} trackProgress={trackProgress} />
        </div>
      </div>
    </div>
  );
};

export default Track;
