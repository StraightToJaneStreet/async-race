import React from 'react';
import ReactDOM from 'react-dom/client';

import AppView from './view/App';
import RacingService from './controller/RacingService';
import RealtimeTickerService, { RealtimeTickerCallback } from './controller/RealtimeTickerService';
import store from './model/store';
import tracksSlice from './model/feature/tracks';
import CarService from './controller/CarService';
import WinnersService from './controller/WinnersService';
import EngineApiService from './controller/EngineApiService';

export default class App {
  protected reactRoot: ReactDOM.Root;
  protected winnersService: WinnersService;
  protected engineApiService: EngineApiService;
  protected ticker: RealtimeTickerService;
  protected carService: CarService;
  protected racingService: RacingService;

  constructor(root: HTMLElement) {
    this.engineApiService = new EngineApiService();
    this.winnersService = new WinnersService();
    this.carService = new CarService();
    this.racingService = new RacingService(this.winnersService, this.engineApiService);
    this.reactRoot = ReactDOM.createRoot(root);
    this.ticker = RealtimeTickerService.getInstance();
  }

  run() {
    const progressUpdateCallback: RealtimeTickerCallback = () => {
      const { updateProgress } = tracksSlice.actions;
      store.dispatch(updateProgress());
    }

    this.ticker.registerCallback(progressUpdateCallback);
    this.ticker.start();

    this.reactRoot.render(React.createElement(AppView, {
      racingServiceContext: this.racingService.createteContext(),
      carServiceContext: this.carService.createContext()
    }, null));
  }
}
