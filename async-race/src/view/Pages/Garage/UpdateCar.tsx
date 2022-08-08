import React from 'react';
import { useDispatch } from 'react-redux';
import { RootState } from "../../../model/store";

import Button from '../../components/Button';
import CarConfiguration from '../../components/CarConfiguration';
import { actionSetName, actionSetColor } from '../../../model/feature/updateCar';
import { connect } from 'react-redux';

interface UpdateCarProps {
  color: string;
  name: string;
}

const mapToState = (state: RootState): UpdateCarProps => {
  return {
    name: state.updateCar.name,
    color: state.updateCar.color
  };
}

function UpdateCar({ name, color }: UpdateCarProps) {
  const dispatch = useDispatch();

  return (
    <div>
      <CarConfiguration
        name={name} color={color}
        updateName={(value) => dispatch(actionSetName(value))}
        updateColor={(value) => dispatch(actionSetColor(value))}/>
      <Button handleClick={() => {}} label='Update'/>
    </div>
  );
}

export default connect(mapToState)(UpdateCar);
