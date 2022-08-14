import { CarCreatingParams, CarDeletingParams } from '../../model/service/serviceAPI'
export { CarCreatingParams, CarDeletingParams } from '../../model/service/serviceAPI'

export interface CarUpdatingParams {
  name: string;
  color: string;
}

interface ICarService {
  createCar: (params: CarCreatingParams) => void;
  deleteCar: (id: CarDeletingParams) => void;
  updateCar: (params: CarUpdatingParams) => void;
  generateCars: () => void;
  selectCarForUpdate: (id: number) => void;
}

export default ICarService;
