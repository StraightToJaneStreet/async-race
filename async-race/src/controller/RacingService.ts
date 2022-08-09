import {
  actionBrokeCarOnTrack,
  actionInitializeTrack,
  actionResetTrack,
  actionTrackFinished,
  TrackInitializationParams
} from "../model/feature/tracks";

import store from "../model/store";
import ApiService from "./ApiService";

export default class RacingService {
  protected static instance: RacingService | null;

  protected constructor() { }

  static getInstance(): RacingService {
    if (RacingService.instance === null) {
      RacingService.instance = new RacingService();
    }
    return RacingService.instance;
  }

  protected createTrackPromise(carId: number): Promise<number> {
    const api = ApiService.getInstance();

    const trackPromise: Promise<number> = new Promise((resolve, reject) => {
      api
        .startEngine(carId)
        .then(({ velocity, distance }) => {
          const init: TrackInitializationParams = {
            carId,
            velocity,
            distance
          };
          store.dispatch(actionInitializeTrack(init));

          return api.setEngineDriveMode(carId);
        })
        .then(
          (result) => {
            if (result) {
              const action = actionTrackFinished(carId);
              store.dispatch(action);
              resolve(carId);
            } else {
              const action = actionBrokeCarOnTrack(carId);
              store.dispatch(action);
              reject();
            }
          },
        );
    });

    return trackPromise;
  }

  startCar(carId: number): void {
    const trackPromise = this.createTrackPromise(carId);
    trackPromise.catch(() => { });
  }

  startRace(carIds: number[]): void {
    const tracks = carIds.map((carId) => this.createTrackPromise(carId));

    new Promise((resolve, reject) => {
      let rejectionsCount = 0;
      const promisesCount = tracks.length;
      tracks.forEach((trackPromise) => {
        trackPromise.then((result) => resolve(result)).catch(() => {
          rejectionsCount += 1;
          if (rejectionsCount === promisesCount) {
            reject();
          }
        })
      })
    })
    .then((winnerId) => { console.log('Winner: ', winnerId)});
  }

  resetRace(_carIds: number[]) {

  }

  stopCarEngine(carId: number) {
    const api = ApiService.getInstance();
    api
      .stopEngine(carId)
      .then(() => {
        store.dispatch(actionResetTrack(carId));
      })
  }

}
