import React from 'react';
import { Provider } from 'react-redux';

import store from '../model/store';

import { ICarServiceContext } from '../services/CarService';
import { IRacingServiceContext } from '../services/RacingService';

import CarServiceContext from './CarServiceContext';
import RacingServiceContext from './RacingServiceContext';

import Main from './Main';

interface WinnerMessage {
  name: string;
  time: number;
}
interface Props {
  overlayContent: WinnerMessage | null;
  carServiceContext: ICarServiceContext;
  racingServiceContext: IRacingServiceContext;
}

export default function WrappedMain({ overlayContent, carServiceContext, racingServiceContext }: Props) {
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
      <CarServiceContext.Provider value={carServiceContext}>
        <RacingServiceContext.Provider value={racingServiceContext}>
          <Main />
          {overlay}
        </RacingServiceContext.Provider>
      </CarServiceContext.Provider>
    </Provider>
  );
}
