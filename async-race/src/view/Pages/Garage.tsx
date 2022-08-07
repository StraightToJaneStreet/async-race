import React, { useContext, useState } from 'react';

import CarConfiguration from '../components/CarConfiguration';
import Button from '../components/Button';
import { RootState } from '../../model/store';
import { Car } from '../../core/Car';
import { selectCars } from '../../model/feature/garage/slice';
import { connect } from 'react-redux';
import TrackList from '../components/TrackList';
import Context from '../AppContext';
import AppContext from '../AppContext';

const INITIAL_COLOR = '#000000';

interface CreateCarProps { }

function CreateCar(_props: CreateCarProps) {
  const [color, setColor] = useState('');
  const [name, setName] = useState('');

  const { handleCreateCar } = useContext(AppContext);

  const createCar = () => {
    handleCreateCar(name, color);
    setName('');
    setColor(INITIAL_COLOR);
  }

  return (
    <div>
      <CarConfiguration
        name={name} color={color}
        updateColor={setColor} updateName={setName}/>
      <Button handleClick={createCar} label='Create'/>
    </div>
  );
}

interface UpdateCarProps { }

function UpdateCar(_props: UpdateCarProps) {
  const [color, setColor] = useState(INITIAL_COLOR);
  const [name, setName] = useState('');
  return (
    <div>
      <CarConfiguration
        name={name} color={color}
        updateColor={setColor} updateName={setName}/>
      <Button handleClick={() => {}} label='Update'/>
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
