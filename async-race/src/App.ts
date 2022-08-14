import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom/client';

import AppView from './view/App';

import store from './model/store';
import tracksSlice from './model/feature/tracks';

import IRacingServiceContext from './services/contexts/IRacingServiceContext';
import RacingService from './services/RacingService';

import ICarServiceContext from './services/contexts/ICarServiceContext';
import CarService from './services/CarService';

import RealtimeTickerService, { RealtimeTickerCallback } from './services/RealtimeTickerService';
import WinnersService from './services/WinnersService';
import EngineApiService from './services/EngineApiService';

export default class App {
  private reactRoot: ReactDOM.Root;

  private winnersService: WinnersService;

  private engineApiService: EngineApiService;

  private ticker: RealtimeTickerService;

  private carService: CarService;

  private racingService: RacingService;

  private racingServiceContext: IRacingServiceContext;

  private carServiceContext: ICarServiceContext;

  constructor(root: HTMLElement) {
    this.engineApiService = new EngineApiService();
    this.winnersService = new WinnersService(this.handleWinner.bind(this));
    this.carService = new CarService();
    this.racingService = new RacingService(this.winnersService, this.engineApiService);
    this.reactRoot = ReactDOM.createRoot(root);
    this.ticker = RealtimeTickerService.getInstance();

    this.racingServiceContext = this.racingService.createteContext();
    this.carServiceContext = this.carService.createContext();
  }

  handleWinner(name: string, time: number) {
    this.reactRoot.render(
      React.createElement(
        AppView,
        {
          overlayContent: { name, time },
          racingServiceContext: this.racingServiceContext,
          carServiceContext: this.carServiceContext,
        },
        null
      )
    );

    setTimeout(this.renderDefault.bind(this), 5000);
  }

  run() {
    const progressUpdateCallback: RealtimeTickerCallback = () => {
      const { updateProgress } = tracksSlice.actions;
      store.dispatch(updateProgress());
    };

    this.ticker.registerCallback(progressUpdateCallback);
    this.ticker.start();

    this.renderDefault();
  }

  renderDefault() {
    this.reactRoot.render(
      React.createElement(
        AppView,
        {
          overlayContent: null,
          racingServiceContext: this.racingServiceContext,
          carServiceContext: this.carServiceContext,
        },
        null
      )
    );
  }
}
