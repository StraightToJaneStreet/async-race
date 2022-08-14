import { defaultContextMemberImplementation } from './utils';

interface IRacingServiceContext {
  startCar: (carId: number) => void;
  stopCar: (carId: number) => void;
  startRaceFor: (carIds: number[]) => void;
  resetRaceFor: (carIds: number[]) => void;
}

export const defaultImplementation: IRacingServiceContext = {
  startCar: defaultContextMemberImplementation,
  stopCar: defaultContextMemberImplementation,
  startRaceFor: defaultContextMemberImplementation,
  resetRaceFor: defaultContextMemberImplementation,
};

export default IRacingServiceContext;
