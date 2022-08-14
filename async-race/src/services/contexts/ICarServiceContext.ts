import { CarCreatingParams, CarDeletingParams } from '../../model/service/serviceAPI'
export { CarCreatingParams as CarCreationParams, CarDeletingParams } from '../../model/service/serviceAPI'

import { defaultContextMemberImplementation } from "./utils";

export interface CarUpdatingParams {
  name: string;
  color: string;
}

interface ICarServiceContext {
  createCar: (params: CarCreatingParams) => void;
  deleteCar: (id: CarDeletingParams) => void;
  updateCar: (params: CarUpdatingParams) => void;
  generateCars: () => void;
  selectCarForUpdate: (id: number) => void;
}
export default ICarServiceContext;

export const defaultImplementation: ICarServiceContext = {
  createCar: defaultContextMemberImplementation,
  deleteCar: defaultContextMemberImplementation,
  updateCar: defaultContextMemberImplementation,
  generateCars: defaultContextMemberImplementation,
  selectCarForUpdate: defaultContextMemberImplementation,
};
