import React from 'react';

import CarConfiguration from '../components/CarConfiguration';
import Button from '../components/Button';

interface CreateCarProps {
  handleCreate: () => void
}

function CreateCar({ handleCreate }: CreateCarProps) {
  return (
    <div>
      <CarConfiguration/>
      <Button handleClick={handleCreate} label='Create'/>
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

function Garage() {
  const handleCreateCar = () => {};
  const handleUpdateCar = () => {};
  const handleRaceStart = () => {};
  const handleGenerateCars = () => {};
  const handleReset = () => {};

  return (
    <>
      <h1>Garage</h1>
      <CreateCar handleCreate={handleCreateCar}/>
      <UpdateCar handleUpdate={handleUpdateCar}/>
      <div>
        <Button handleClick={handleRaceStart} label='Race'/>
        <Button handleClick={handleReset} label='Reset'/>
        <Button handleClick={handleGenerateCars} label='Generate cars'/>
      </div>
      <h2>Garage ({})</h2>
    </>
  );
}

export default Garage;
