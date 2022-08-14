export type TickerCallback = {
  (): void;
}

interface IAnimationTickerService {
  registerCallback(callback: TickerCallback): void;
  removeCallback(callback: TickerCallback): void;
  start(): void;
  stop(): void;
}
export default IAnimationTickerService;
