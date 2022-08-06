import React from 'react';

import { Car } from "../../core/Car"

interface CarsListProps {
  cars: Car[]
}

interface CarProps {
  car: Car
}

const Car = ({ car }: CarProps) => {
  return (
    <p>Car: {car.name}</p>
  )
}

const CarsList = ({ cars }: CarsListProps) => {
  return (
    <>
    {cars.map(car => <Car key={car.id} car={car}/>)}
    </>
  );
}

export default CarsList;
