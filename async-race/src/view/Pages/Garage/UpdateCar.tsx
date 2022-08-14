import React from 'react';
import { useDispatch } from 'react-redux';
import { connect, useSelector } from 'react-redux';

import { RootState, storeSelectUpdateCarConfigurationState, storeSelectGaragePage } from '../../../model/store';
import updateCarConfigurationSlice from '../../../model/feature/updateCar';

import DIContainer from '../../../DIContainer';
import { TYPES } from '../../../InjectionTypes';
import ICarService from '../../../services/interfaces/ICarService';

import Button from '../../components/Button';
import CarConfiguration from '../../components/CarConfiguration';

interface UpdateCarProps {
  color: string;
  name: string;
}

const mapToState = (state: RootState): UpdateCarProps => {
  const { name, color } = storeSelectUpdateCarConfigurationState(state);
  return { name, color };
};

function UpdateCar({ name, color }: UpdateCarProps) {
  const { carForUpdate } = useSelector(storeSelectGaragePage);

  const isElementEnabled = carForUpdate !== null;

  const carService = DIContainer.get<ICarService>(TYPES.CarService);
  const { setName, setColor } = updateCarConfigurationSlice.actions;

  const dispatch = useDispatch();

  return (
    <div className="configurator configurator__update">
      <CarConfiguration
        name={name}
        color={color}
        enabled={isElementEnabled}
        updateName={(value) => dispatch(setName(value))}
        updateColor={(value) => dispatch(setColor(value))}
      />
      <Button label="Update" enabled={isElementEnabled} handleClick={() => carService.updateCar({ color, name })} />
    </div>
  );
}

export default connect(mapToState)(UpdateCar);
