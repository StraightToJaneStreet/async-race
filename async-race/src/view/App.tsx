import React, { useState } from 'react';
import { Provider } from 'react-redux';

import { ICarServiceContext } from '../controller/CarSevice';
import CarServiceContext from './CarServiceContext';

import store from '../model/store';
import Context, { AppContext } from './AppContext';
import Main from './Main';

type Props = {
  carServiceContext: ICarServiceContext,
  context: AppContext
}

export default function WrappedMain({
  context,
  carServiceContext
}: Props) {
  const [contextState] = useState(context);

  return (
    <Provider store={store}>
      <Context.Provider value={contextState}>
        <CarServiceContext.Provider value={carServiceContext}>      
            <Main/>
        </CarServiceContext.Provider>
      </Context.Provider>
    </Provider>
  );
}
