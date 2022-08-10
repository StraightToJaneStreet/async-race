import serviceAPI from "../model/service/serviceAPI";
import store from "../model/store";

interface HandleRacingVictoryParams {
  id: number;
  time: number;
}

export default class WinnersService {
  winners: Set<number>;

  constructor() {
    this.winners = new Set();
  }

  handleRacingVictory({ id, time }: HandleRacingVictoryParams) {
    const prettyTime = Math.trunc(time * 100) / 100;
    const res = store.dispatch(serviceAPI.endpoints.readWinner.initiate(id));
    res.then(({ data: winner }) => {
      if (winner === undefined) {
        store.dispatch(serviceAPI.endpoints.createWinner.initiate({
          id,
          time: prettyTime,
          wins: 1
        }));
        return;
      }

      const {
        wins: oldWinsCount,
        time: oldBestTime
      } = winner;

      store.dispatch(serviceAPI.endpoints.updateWinner.initiate({
        id,
        time: Math.min(oldBestTime, prettyTime),
        wins: oldWinsCount + 1
      }))
    });
  }
}
