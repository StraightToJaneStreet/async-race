import { injectable } from 'inversify';

import IAnimationTickerService, { TickerCallback } from './interfaces/IAnimationTicker';

@injectable()
export default class RealtimeTickerService implements IAnimationTickerService {
  private needStop = false;

  private tracks: Set<TickerCallback> = new Set();

  registerCallback(callback: TickerCallback) {
    this.tracks.add(callback);
  }

  removeCallback(callback: TickerCallback) {
    this.tracks.delete(callback);
  }

  start() {
    this.needStop = false;
    window.requestAnimationFrame(this.tick.bind(this));
  }

  stop() {
    this.needStop = true;
  }

  private tick() {
    if (this.needStop === true) {
      return;
    }
    this.tracks.forEach((callback) => callback());
    window.requestAnimationFrame(this.tick.bind(this));
  }
}
