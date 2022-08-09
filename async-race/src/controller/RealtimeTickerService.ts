export type RealtimeTickerCallback = () => void;

export default class RealtimeTickerService {
  static instance: RealtimeTickerService | null = null;
  
  static getInstance(): RealtimeTickerService {
    if (RealtimeTickerService.instance === null) {
      RealtimeTickerService.instance = new RealtimeTickerService();
    }

    return RealtimeTickerService.instance;
  }

  protected constructor() { }

  protected needStop: boolean = false;

  protected tracks: Set<RealtimeTickerCallback> = new Set();

  registerCallback(callback: RealtimeTickerCallback) {
    this.tracks.add(callback);
  }

  removeCallack(callback: RealtimeTickerCallback) {
    this.tracks.delete(callback);
  }

  start() {
    this.needStop = false;
    window.requestAnimationFrame(this.tick.bind(this));
  }

  stop() {
    this.needStop = true;
  }

  protected tick() {
    if (this.needStop === true) {
      return;
    }
    this.tracks.forEach((callback) => callback());
    window.requestAnimationFrame(this.tick.bind(this));
  }
}