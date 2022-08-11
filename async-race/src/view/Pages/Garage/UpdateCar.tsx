import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { RootState, storeSelectUpdateCarConfigurationState, storeSelectGaragePage } from '../../../model/store';

import Button from '../../components/Button';
import CarConfiguration from '../../components/CarConfiguration';
import updateCarConfigurationSlice from '../../../model/feature/updateCar';
import { connect, useSelector } from 'react-redux';

import CarServiceContext from '../../CarServiceContext';

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

  const { updateCar } = useContext(CarServiceContext);
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
      <Button label="Update" enabled={isElementEnabled} handleClick={() => updateCar({ color, name })} />
    </div>
  );
}

export default connect(mapToState)(UpdateCar);
