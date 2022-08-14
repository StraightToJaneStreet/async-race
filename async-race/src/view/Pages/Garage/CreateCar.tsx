import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { RootState, storeSelectCreateCarConfigurationState } from '../../../model/store';
import createCarConfigurationSlice from '../../../model/feature/createCar';

import Button from '../../components/Button';
import CarConfiguration from '../../components/CarConfiguration';
import DIContainer from '../../../DIContainer';

import ICarService from '../../../services/interfaces/ICarService';
import { TYPES } from '../../../InjectionTypes';

interface CreateCarProps {
  name: string;
  color: string;
}

const mapToState = (state: RootState): CreateCarProps => {
  const { name, color } = storeSelectCreateCarConfigurationState(state);

  return { name, color };
};

function CreateCar({ name, color }: CreateCarProps) {
  const carService = DIContainer.get<ICarService>(TYPES.CarService);

  const { setColor, setName } = createCarConfigurationSlice.actions;

  const dispatch = useDispatch();

  return (
    <div className="configurator configurator__create-car">
      <CarConfiguration
        name={name}
        color={color}
        updateColor={(value) => dispatch(setColor(value))}
        updateName={(value) => dispatch(setName(value))}
      />
      <Button
        label="Create"
        enabled={name.length !== 0}
        handleClick={() => carService.createCar({ name, color })} />
    </div>
  );
}

export default connect(mapToState)(CreateCar);
