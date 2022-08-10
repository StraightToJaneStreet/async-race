import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { RootState, storeSelectGaragePage } from "../../../model/store";

import Button from '../../components/Button';
import CarConfiguration from '../../components/CarConfiguration';
import { actionSetName, actionSetColor } from '../../../model/feature/updateCar';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import CarServiceContext from '../../CarServiceContext';

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
  const { carIdForUpdate } = useSelector(storeSelectGaragePage);

  const { updateCar } = useContext(CarServiceContext);

  const dispatch = useDispatch();

  return (
    <div className="configurator configurator__update">
      <CarConfiguration
        name={name} color={color}
        enabled={carIdForUpdate !== null}
        updateName={(value) => dispatch(actionSetName(value))}
        updateColor={(value) => dispatch(actionSetColor(value))}/>
      <Button
        label='Update'
        enabled={carIdForUpdate !== null}
        handleClick={() => updateCar({ color, name })} />
    </div>
  );
}

export default connect(mapToState)(UpdateCar);
