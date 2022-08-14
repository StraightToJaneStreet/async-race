interface IRacingService {
  startCar: (carId: number) => void;
  stopCar: (carId: number) => void;
  startRaceFor: (carIds: number[]) => void;
  resetRaceFor: (carIds: number[]) => void;
}

export default IRacingService;
