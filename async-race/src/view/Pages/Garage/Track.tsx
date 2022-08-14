import React from 'react';
import { useSelector } from 'react-redux';

import { Car } from '../../../core/Car';
import { selectTrack } from '../../..//model/feature/tracks';
import { storeSelectTracks } from '../../../model/store';

import DIContainer from '../../../DIContainer';
import { TYPES } from '../../../InjectionTypes';
import ICarService from '../../../services/interfaces/ICarService';

import EngineStatus from './EngineStatus';

import Button from '../../components/Button';
import CarComponent from '../../components/Car';

interface TrackProps {
  car: Car;
}

const Track = ({ car }: TrackProps) => {
  const carService = DIContainer.get<ICarService>(TYPES.CarService);

  const state = useSelector(storeSelectTracks);
  const trackParams = selectTrack(state, car.id);

  const trackProgress = trackParams?.completedTrackPercent ?? 0;

  return (
    <div className="track">
      <div className="track__header">
        <Button label="Select" small handleClick={() => carService.selectCarForUpdate(car.id)} />
        <Button label="Remove" small handleClick={() => carService.deleteCar({ id: car.id })} />
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
