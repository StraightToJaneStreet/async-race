import { inject, injectable } from 'inversify';

import store, { storeSelectTracks } from '../model/store';
import { selectTrack } from '../model/feature/tracks';
import serviceAPI from '../model/service/serviceAPI';

import { TYPES } from '../InjectionTypes';

import IWinnerService, { HandleRacingVictoryParams } from './interfaces/IWinnersService';
import IWinnersHandler from './interfaces/IWinnersHandler';

@injectable()
export default class WinnersService implements IWinnerService {
  constructor(
    @inject(TYPES.WinnersHandler) private winnersHandler: IWinnersHandler
  ) { }

  handleRacingVictory({ id, time }: HandleRacingVictoryParams) {
    const prettyTime = Math.trunc(time * 100) / 100;

    const tracksState = storeSelectTracks(store.getState());
    const isWinnerOnTrack = selectTrack(tracksState, id) !== undefined;

    if (isWinnerOnTrack === false) {
      return;
    }

    const res = store.dispatch(serviceAPI.endpoints.readWinner.initiate(id));
    res.then(({ data: winner }) => {
      if (winner === undefined) {
        store.dispatch(
          serviceAPI.endpoints.createWinner.initiate({
            id,
            time: prettyTime,
            wins: 1,
          })
        );
        return;
      }

      const { wins: oldWinsCount, time: oldBestTime } = winner;

      store.dispatch(
        serviceAPI.endpoints.updateWinner.initiate({
          id,
          time: Math.min(oldBestTime, prettyTime),
          wins: oldWinsCount + 1,
        })
      );
    });

    const carSubscription = store.dispatch(serviceAPI.endpoints.readCar.initiate({ id }));

    carSubscription.then(({ data: car }) => {
      if (car !== undefined) {
        this.winnersHandler.handleWinner(car.name, time);
      }
    });
  }
}