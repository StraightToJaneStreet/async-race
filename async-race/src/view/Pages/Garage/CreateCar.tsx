import React, { useContext } from 'react';
import { connect, useDispatch } from 'react-redux';

import Button from '../../components/Button';
import CarConfiguration from '../../components/CarConfiguration';

import {
  actionSetName,
  actionSetColor
} from '../../../model/feature/createCar';

import { RootState } from '../../../model/store';
import CarServiceContext from '../../CarServiceContext';

interface CreateCarProps {
  name: string;
  color: string;
}

const mapToState = (state: RootState): CreateCarProps => {
  return {
    color: state.createCar.color,
    name: state.createCar.name
  }
}

function CreateCar({ name, color }: CreateCarProps) {
  const { createCar } = useContext(CarServiceContext);

  const dispatch = useDispatch();

  return (
    <div className="configurator configurator__create-car">
      <CarConfiguration
        name={name} color={color}
        updateColor={(value) => dispatch(actionSetColor(value))}
        updateName={(value) => dispatch(actionSetName(value))}/>
      <Button
        label='Create'
        enabled={name.length !== 0}
        handleClick={() => createCar({ name, color })}/>
    </div>
  );
}

export default connect(mapToState)(CreateCar);
