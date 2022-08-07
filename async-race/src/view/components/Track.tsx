import React, { useContext } from 'react';

import { Car } from '../../core/Car';
import AppContext from '../AppContext';
import Button from './Button';

interface TrackProps {
  car: Car
}



const Track = ({ car }: TrackProps) => {
  const {
    handleCarStart,
    handleCarRemove
  } = useContext(AppContext);

  return (
    <div className="track">
      <Button handleClick={() => handleCarStart(car.id)} label='Start'/>
      <Button handleClick={() => handleCarRemove(car.id)} label='Remove'/>
      <p>Id: {car.id}</p>
      <p>Color: {car.color}</p>
      <p>Name: {car.name}</p>
    </div>
  )
}

export default Track;
