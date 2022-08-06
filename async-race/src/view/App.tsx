import React, { useState } from 'react';
import { Provider } from 'react-redux';

import store from '../model/store';
import Context, { TContext } from './Context';
import Main from './Main';

type Props = {
  context: TContext
}

export default function WrappedMain({ context }: Props) {
  const [contextState] = useState(context);

  return (
    <Context.Provider value={contextState}>
      <Provider store={store}>
        <Main/>
      </Provider>
    </Context.Provider>
  );
}
