import React, { useState } from 'react';
import { Provider } from 'react-redux';

import { ICarServiceContext } from '../controller/CarSevice';
import { IRacingServiceContext } from '../controller/RacingService';
import CarServiceContext from './CarServiceContext';

import store from '../model/store';
import Context, { AppContext } from './AppContext';
import Main from './Main';
import RacingServiceContext from './RacingServiceContext';

interface Props {
  carServiceContext: ICarServiceContext;
  racingServiceContext: IRacingServiceContext;
  context: AppContext;
}

export default function WrappedMain({
  context,
  carServiceContext,
  racingServiceContext
}: Props) {
  const [contextState] = useState(context);

  return (
    <Provider store={store}>
      <Context.Provider value={contextState}>
        <CarServiceContext.Provider value={carServiceContext}>
          <RacingServiceContext.Provider value={racingServiceContext}>
            <Main/>
          </RacingServiceContext.Provider>
        </CarServiceContext.Provider>
      </Context.Provider>
    </Provider>
  );
}
