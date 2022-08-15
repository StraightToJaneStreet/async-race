import React from 'react';
import ReactDOM from 'react-dom/client';
import { inject, injectable } from 'inversify';

import AppView from './view/App';

import store from './model/store';
import tracksSlice from './model/feature/tracks';

import { TYPES } from './InjectionTypes';
import IAnimationTickerService, { TickerCallback } from './services/interfaces/IAnimationTicker';

import IApplication from './IApplication';

@injectable()
export default class App implements IApplication {
  private reactRoot: ReactDOM.Root | null = null;

  constructor(
    @inject(TYPES.AnimationTickerService) private ticker: IAnimationTickerService
  ) {}

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
    if (this.reactRoot === null) {
      throw Error('Cant render without initialized ReactDOM.Root');
    }
    const reactElement = React.createElement(AppView, {}, null);
    this.reactRoot.render(reactElement);
  }
}
