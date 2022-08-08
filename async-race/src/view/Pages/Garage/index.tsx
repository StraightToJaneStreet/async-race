import React, { useContext } from 'react';

import Button from '../../components/Button';
import { RootState } from '../../../model/store';
import { Car } from '../../../core/Car';
import { selectCars } from '../../../model/feature/garage/slice';
import { connect } from 'react-redux';
import TrackList from '../../components/TrackList';
import Context from '../../AppContext';

import CreateCar from './CreateCar';
import UpdateCar from './UpdateCar';

interface GarageProps {
  cars: Car[]
}

const mapState = (state: RootState): GarageProps => {
  const cars = selectCars(state.garage);
  return { cars };
}

function Garage({ cars }: GarageProps) {
  const context = useContext(Context);

  const {
    handleRaceStart,
    handleGenerateCars,
    handleReset
  } = context;

  return (
    <>
      <h1>Garage</h1>
      <CreateCar/>
      <UpdateCar/>
      <div>
        <Button handleClick={handleRaceStart} label='Race'/>
        <Button handleClick={handleReset} label='Reset'/>
        <Button handleClick={handleGenerateCars} label='Generate cars'/>
      </div>
      <h2>Garage ({cars.length})</h2>
      <div className="garage__cars">
        <TrackList cars={cars.filter((_car, ind) => ind < 20)}/>
      </div>
    </>
  );
}

export default connect(mapState)(Garage);
