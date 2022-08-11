import React from 'react';

import { Provider } from 'react-redux';

import { ICarServiceContext } from '../controller/CarService';
import { IRacingServiceContext } from '../controller/RacingService';
import CarServiceContext from './CarServiceContext';

import store from '../model/store';
import Main from './Main';
import RacingServiceContext from './RacingServiceContext';

interface WinnerMessage {
  name: string;
  time: number;
}
interface Props {
  overlayContent: WinnerMessage | null;
  carServiceContext: ICarServiceContext;
  racingServiceContext: IRacingServiceContext;
}

export default function WrappedMain({
  overlayContent,
  carServiceContext,
  racingServiceContext
}: Props) {
  const overlay = overlayContent !== null
    ? <div className="overlay">
        <div className="overlay__content">
          <p className="winner-message">
            Winner: {overlayContent.name}({overlayContent.time})
          </p>
        </div>
      </div>
    : <></>

  return (
    <Provider store={store}>
        <CarServiceContext.Provider value={carServiceContext}>
          <RacingServiceContext.Provider value={racingServiceContext}>
            <Main/>
            {overlay}
          </RacingServiceContext.Provider>
        </CarServiceContext.Provider>
    </Provider>
  );
}
