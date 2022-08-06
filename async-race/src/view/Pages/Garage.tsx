import React, { useContext, useState } from 'react';

import CarConfiguration from '../components/CarConfiguration';
import Button from '../components/Button';
import { RootState } from '../../model/store';
import { Car } from '../../core/Car';
import { selectCars } from '../../model/feature/garage/slice';
import { connect } from 'react-redux';
import CarsList from '../components/CarsList';
import Context from '../AppContext';

interface CreateCarProps {
  handleCreate: (name: string, color: string) => void
}

function CreateCar({ handleCreate }: CreateCarProps) {
  const [color, setColor] = useState('#000000');
  const [name, setName] = useState('');

  return (
    <div>
      <CarConfiguration udpateColor={setColor} updateName={setName}/>
      <Button handleClick={() => handleCreate(name, color)} label='Create'/>
    </div>
  );
}

interface UpdateCarProps {
  handleUpdate: () => void
}

function UpdateCar({ handleUpdate }: UpdateCarProps) {
  return (
    <div>
      <CarConfiguration/>
      <Button handleClick={handleUpdate} label='Update'/>
    </div>
  );
}

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
    handleCreateCar,
    handleUpdateCar,
    handleRaceStart,
    handleGenerateCars,
    handleReset
  } = context;

  return (
    <>
      <h1>Garage</h1>
      <CreateCar handleCreate={(name: string, color) => handleCreateCar(name, color)}/>
      <UpdateCar handleUpdate={handleUpdateCar}/>
      <div>
        <Button handleClick={handleRaceStart} label='Race'/>
        <Button handleClick={handleReset} label='Reset'/>
        <Button handleClick={handleGenerateCars} label='Generate cars'/>
      </div>
      <h2>Garage ({cars.length})</h2>
      <div className="garage__cars">
        <CarsList cars={cars.filter((_car, ind) => ind < 20)}/>
      </div>
    </>
  );
}

export default connect(mapState)(Garage);
