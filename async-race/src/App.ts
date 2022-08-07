import React from 'react';
import ReactDOM from 'react-dom/client';

import PagesController from './controller/PagesController';
import GarageController from './controller/GarageController';

import AppView from './view/App';
import { AppContext } from './view/AppContext';
import RacingService from './controller/RacingService';

export default class App {
  reactRoot: ReactDOM.Root;
  pagesController =  new PagesController();
  garageController = new GarageController();
  racingService = new RacingService();

  constructor(root: HTMLElement) {
    this.reactRoot = ReactDOM.createRoot(root);
  }

  run() {
    const appContext: AppContext = {
      handleSetPage: this.pagesController.setPage.bind(this.pagesController),
      handleCreateCar: this.garageController.createCar.bind(this.garageController),
      handleGenerateCars: this.garageController.generateCars.bind(this.garageController),

      handleCarRemove: this.garageController.removeCar.bind(this.garageController),

      handleCarStart: this.racingService.startCar.bind(this.racingService),
      handleRaceStart: this.racingService.startRace.bind(this.racingService),

      handleReset: () => {},
      handleUpdateCar: () => {},
    };

    this.reactRoot.render(React.createElement(AppView, {
      context: appContext
    }, null));
  }
}
