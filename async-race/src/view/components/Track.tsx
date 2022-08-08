import React, { useContext } from 'react';

import { Car } from '../../core/Car';
import AppContext from '../AppContext';
import Button from './Button';
import CarComponent from './Car';


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
      <div className="track__buttons">
        <Button handleClick={() => handleCarStart(car.id)} label='Start'/>
        <Button handleClick={() => handleCarRemove(car.id)} label='Remove'/>
      </div>
      <div className="track__road">
        <CarComponent color={car.color}/>
      </div>
    </div>
  )
}

export default Track;
