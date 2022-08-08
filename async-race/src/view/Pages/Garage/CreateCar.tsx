import React from 'react';
import { useContext } from 'react';
import { connect, useDispatch } from 'react-redux';

import AppContext from '../../AppContext';
import Button from '../../components/Button';
import CarConfiguration from '../../components/CarConfiguration';

import {
  actionSetName,
  actionSetColor
} from '../../../model/feature/createCar';
import { RootState } from '../../../model/store';

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
  const { handleCreateCar } = useContext(AppContext);

  const dispatch = useDispatch();

  const createCar = () => {
    handleCreateCar(name, color);
  }

  return (
    <div className="configurator configurator__create-car">
      <CarConfiguration
        name={name} color={color}
        updateColor={(value) => dispatch(actionSetColor(value))}
        updateName={(value) => dispatch(actionSetName(value))}/>
      <Button handleClick={createCar} label='Create'/>
    </div>
  );
}

export default connect(mapToState)(CreateCar);
