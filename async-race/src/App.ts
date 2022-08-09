import React from 'react';
import ReactDOM from 'react-dom/client';

import PagesController from './controller/PagesController';
import GarageController from './controller/GarageController';

import AppView from './view/App';
import { AppContext } from './view/AppContext';
import RacingService from './controller/RacingService';
import RealtimeTickerService, { RealtimeTickerCallback } from './controller/RealtimeTickerService';
import store from './model/store';
import { actionUpdateProgress } from './model/feature/tracks';

export default class App {
  protected reactRoot: ReactDOM.Root;
  protected pagesController =  new PagesController();
  protected garageController = new GarageController();
  protected racingService: RacingService = RacingService.getInstance();
  protected ticker: RealtimeTickerService;

  constructor(root: HTMLElement) {
    this.reactRoot = ReactDOM.createRoot(root);
    this.ticker = RealtimeTickerService.getInstance();
  }

  run() {
    const progressUpdateCallback: RealtimeTickerCallback = () => {
      store.dispatch(actionUpdateProgress());
    }

    this.ticker.registerCallback(progressUpdateCallback);
    this.ticker.start();

    this.garageController.initialize();

    const appContext: AppContext = {
      handleSetPage: this.pagesController.setPage.bind(this.pagesController),
      handleCreateCar: this.garageController.createCar.bind(this.garageController),
      handleGenerateCars: this.garageController.generateCars.bind(this.garageController),

      handleCarStart: this.racingService.startCar.bind(this.racingService),
      handleCarReset: this.racingService.stopCarEngine.bind(this.racingService),
      handleCarRemove: this.garageController.removeCar.bind(this.garageController),

      handleRaceStart: this.racingService.startRace.bind(this.racingService),

      handleReset: () => {},
      handleUpdateCar: () => {},
    };

    this.reactRoot.render(React.createElement(AppView, {
      context: appContext
    }, null));
  }
}
