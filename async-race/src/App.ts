import React from 'react';
import ReactDOM from 'react-dom/client';
import { inject, injectable } from 'inversify';

import AppView from './view/App';

import store from './model/store';
import tracksSlice from './model/feature/tracks';

import { TYPES } from './InjectionTypes';
import IAnimationTickerService, { TickerCallback } from './services/interfaces/IAnimationTicker';

import IApplication from './IApplication';
import IWinnerMessage from './core/IWinnerMessage';
import IWinnersHandler from './services/interfaces/IWinnersHandler';

@injectable()
export default class App implements IApplication, IWinnersHandler {
  private reactRoot: ReactDOM.Root | null = null;
  private winner: IWinnerMessage | null = null;

  constructor(
    @inject(TYPES.AnimationTickerService) private ticker: IAnimationTickerService
  ) {}

  handleWinner(name: string, time: number) {
    this.winner = { name, time };
    this.render();

    setTimeout(() => {
      this.winner = null;
      this.render();
    }, 5000);
  }

  run(root: HTMLDivElement) {
    this.reactRoot = ReactDOM.createRoot(root);

    const progressUpdateCallback: TickerCallback = () => {
      const { updateProgress } = tracksSlice.actions;
      store.dispatch(updateProgress());
    };

    this.ticker.registerCallback(progressUpdateCallback);
    this.ticker.start();

    this.render();
  }

  render() {
    this.reactRoot?.render(
      React.createElement(
        AppView,
        {
          overlayContent: this.winner,
        },
        null
      )
    );
  }
}
