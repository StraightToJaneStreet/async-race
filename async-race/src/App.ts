import React from 'react';
import ReactDOM from 'react-dom/client';

import PagesController from './controller/PagesController';

import AppView from './view/App';
import { AppContext } from './view/AppContext';
import RacingService from './controller/RacingService';
import RealtimeTickerService, { RealtimeTickerCallback } from './controller/RealtimeTickerService';
import store from './model/store';
import { actionUpdateProgress } from './model/feature/tracks';
import CarService from './controller/CarSevice';

export default class App {
  protected reactRoot: ReactDOM.Root;
  protected pagesController =  new PagesController();
  protected ticker: RealtimeTickerService;
  protected carService: CarService;

  constructor(root: HTMLElement) {
    this.carService = new CarService();
    this.reactRoot = ReactDOM.createRoot(root);
    this.ticker = RealtimeTickerService.getInstance();
  }

  run() {
    const progressUpdateCallback: RealtimeTickerCallback = () => {
      store.dispatch(actionUpdateProgress());
    }
    
    this.ticker.registerCallback(progressUpdateCallback);
    this.ticker.start();

    const racingService = RacingService.getInstance();

    const appContext: AppContext = {
      handleSetPage: this.pagesController.setPage.bind(this.pagesController),

      handleCarStart: racingService.startCar.bind(racingService),
      handleCarReset: racingService.stopCarEngine.bind(racingService),

      handleRaceStart: racingService.startRace.bind(racingService),

      handleReset: () => {},
      handleUpdateCar: () => {},
    };

    this.reactRoot.render(React.createElement(AppView, {
      context: appContext,
      carServiceContext: this.carService.createContext()
    }, null));
  }
}
