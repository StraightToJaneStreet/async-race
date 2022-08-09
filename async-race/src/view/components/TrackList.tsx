import React from 'react';

import { Car } from "../../core/Car"
import Track from './Track';

interface CarsListProps {
  cars: Car[]
}

const TrackList = ({ cars }: CarsListProps) => {
  return (
    <>
      {cars.map(car => <Track key={car.id} car={car}/>)}
    </>
  );
}

export default TrackList;
