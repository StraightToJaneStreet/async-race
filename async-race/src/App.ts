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
import WinnersService from './controller/WinnersService';
import EngineApiService from './controller/EngineApiService';

export default class App {
  protected reactRoot: ReactDOM.Root;
  protected pagesController =  new PagesController();
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
      store.dispatch(actionUpdateProgress());
    }

    this.ticker.registerCallback(progressUpdateCallback);
    this.ticker.start();

    const appContext: AppContext = {
      handleSetPage: this.pagesController.setPage.bind(this.pagesController),
      handleUpdateCar: () => {},
    };

    this.reactRoot.render(React.createElement(AppView, {
      context: appContext,
      racingServiceContext: this.racingService.createteContext(),
      carServiceContext: this.carService.createContext()
    }, null));
  }
}
