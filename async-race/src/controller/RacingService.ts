import { resolveConfig } from "prettier";
import { actionInitializeTrack, TrackInitializationParams } from "../model/feature/tracks";
import store from "../model/store";
import ApiService from "./ApiService";

export default class RacingService {
  protected static instance: RacingService | null;

  startCar(carId: number) {
    const api = ApiService.getInstance();
    const trackPromise: Promise<void> = new Promise((resolve, reject) => {
      api
        .startEngine(carId)
        .then(({ velocity, distance }) => {
          const init: TrackInitializationParams = {
            carId,
            velocity,
            distance
          };
          store.dispatch(actionInitializeTrack(init))
        })
        .then(() => {
          api.setEngineDriveMode(carId)
        })
        .then(
          () => {
            resolve();
          },
          () => {
            reject();
          }
        );
    });

    return trackPromise;
  }

  startRace() {

  }

  static getInstance(): RacingService {
    if (RacingService.instance === null) {
      RacingService.instance = new RacingService();
    }
    return RacingService.instance;
  }
}
