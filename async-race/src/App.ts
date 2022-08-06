import React from 'react';
import ReactDOM from 'react-dom/client';
import PagesController from './controller/PagesController';

import AppView from './view/App';

export default class App {
  reactRoot: ReactDOM.Root;
  pagesController =  new PagesController();

  constructor(root: HTMLElement) {
    this.reactRoot = ReactDOM.createRoot(root);
  }

  run() {
    this.reactRoot.render(React.createElement(AppView, {
      context: {
        setPage: this.pagesController.setPage.bind(this.pagesController)
      }
    }, null));
  }
}
