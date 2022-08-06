import React, { useState } from 'react';
import { Provider } from 'react-redux';

import store from '../model/store';
import Context, { AppContext } from './AppContext';
import Main from './Main';

type Props = {
  context: AppContext
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
