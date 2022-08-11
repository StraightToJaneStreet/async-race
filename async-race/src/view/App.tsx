import React from 'react';

import { Provider } from 'react-redux';

import { ICarServiceContext } from '../controller/CarService';
import { IRacingServiceContext } from '../controller/RacingService';
import CarServiceContext from './CarServiceContext';

import store from '../model/store';
import Main from './Main';
import RacingServiceContext from './RacingServiceContext';

interface Props {
  carServiceContext: ICarServiceContext;
  racingServiceContext: IRacingServiceContext;
}

export default function WrappedMain({
  carServiceContext,
  racingServiceContext
}: Props) {

  return (
    <Provider store={store}>
        <CarServiceContext.Provider value={carServiceContext}>
          <RacingServiceContext.Provider value={racingServiceContext}>
            <Main/>
          </RacingServiceContext.Provider>
        </CarServiceContext.Provider>
    </Provider>
  );
}
