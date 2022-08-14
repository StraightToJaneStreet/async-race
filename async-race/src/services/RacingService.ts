import { injectable, inject } from 'inversify';

import store, { storeSelectTracks } from '../model/store';
import tracksSlice from '../model/feature/tracks';
import { selectllTracks, selectTrack, TrackInitializationParams } from '../model/feature/tracks';

import IRacingService from './interfaces/IRacingService';

import EngineApiService from './EngineApiService';
import WinnersService from './WinnersService';
import { TYPES } from '../InjectionTypes';

interface SuccesfulRaceEndParams {
  id: number;
  duration: number;
}

@injectable()
export default class RacingService implements IRacingService {
  constructor(
    @inject(TYPES.WinnersService) private winnersService: WinnersService,
    @inject(TYPES.EngineApiService) private engineApiService: EngineApiService
  ) {}

  private createTrackPromise(carId: number): Promise<SuccesfulRaceEndParams> {
    const trackPromise: Promise<SuccesfulRaceEndParams> = new Promise((resolve, reject) => {
      const startTimestamp = performance.now();
      this.engineApiService
        .startEngine(carId)
        .then(({ velocity, distance }) => {
          const init: TrackInitializationParams = {
            carId,
            velocity,
            distance,
          };
          const { initializeTrack } = tracksSlice.actions;
          store.dispatch(initializeTrack(init));

          return this.engineApiService.setEngineDriveMode(carId);
        })
        .then((result) => {
          if (result) {
            const endTimespamp = performance.now();
            const { finishTrack } = tracksSlice.actions;
            const action = finishTrack(carId);
            store.dispatch(action);
            resolve({
              id: carId,
              duration: (endTimespamp - startTimestamp) / 1000,
            });
          } else {
            const { brokeCar } = tracksSlice.actions;
            const action = brokeCar(carId);
            store.dispatch(action);
            reject();
          }
        });
    });

    return trackPromise;
  }

  startCar(carId: number): void {
    const trackPromise = this.createTrackPromise(carId);
    trackPromise.catch(() => {});
  }

  stopCar(carId: number): void {
    const state = storeSelectTracks(store.getState());
    const track = selectTrack(state, carId);
    if (track === undefined) {
      return;
    }
    this.stopCarEngine(track.carId);
  }

  startRaceFor(carIds: number[]): void {
    const tracks = carIds.map((carId) => this.createTrackPromise(carId));

    new Promise<SuccesfulRaceEndParams>((resolve, reject) => {
      let rejectionsCount = 0;
      const promisesCount = tracks.length;
      tracks.forEach((trackPromise) => {
        trackPromise
          .then((result) => resolve(result))
          .catch(() => {
            rejectionsCount += 1;
            if (rejectionsCount === promisesCount) {
              reject();
            }
          });
      });
    })
      .then(({ id, duration }) => {
        this.winnersService.handleRacingVictory({
          id,
          time: duration,
        });
      })
      .catch(() => {});
  }

  resetRaceFor(carIds: number[]) {
    const state = storeSelectTracks(store.getState());
    const tracks = selectllTracks(state);

    tracks
      .filter((track) => carIds.includes(track.carId))
      .forEach((track) => {
        this.stopCarEngine(track.carId);
      });
  }

  private stopCarEngine(carId: number) {
    const { resetTrack } = tracksSlice.actions;
    store.dispatch(resetTrack(carId));
    this.engineApiService.stopEngine(carId);
  }
}
