import ApiService from "./ApiService";

export default class RacingService {
  protected static instance: RacingService | null;

  startCar(carId: number) {
    const api = ApiService.getInstance();
    api
      .startEngine(carId)
      .then(({ velocity, distance }) => {})
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
