import React from 'react';
import { Provider } from 'react-redux';

import store from '../model/store';

import IWinnerMessage from '../core/IWinnerMessage';

import Main from './Main';

interface Props {
  overlayContent: IWinnerMessage | null;
}

export default function WrappedMain({ overlayContent }: Props) {
  const overlay =
    overlayContent !== null ? (
      <div className="overlay">
        <div className="overlay__content">
          <p className="winner-message">
            Winner: {overlayContent.name}({overlayContent.time})
          </p>
        </div>
      </div>
    ) : (
      <></>
    );

  return (
    <Provider store={store}>
      <Main />
      {overlay}
    </Provider>
  );
}
