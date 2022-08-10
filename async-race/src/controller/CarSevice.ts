import serviceAPI, {
  CarCreationParams,
  CarDeletingParams,
} from '../model/service/serviceAPI';
import store from '../model/store';

function defaultContextImplementation(..._ags: unknown[]): void {}

export interface ICarServiceContext {
  createCar: (params: CarCreationParams) => void;
  deleteCar: (id: CarDeletingParams) => void;
}

export const defaultCarServiceContext: ICarServiceContext = {
  createCar: defaultContextImplementation,
  deleteCar: defaultContextImplementation
}

export default class CarService {
  createCar(params: CarCreationParams) {
    store.dispatch(serviceAPI.endpoints.createCar.initiate(params));
  }

  deleteCar(params: CarDeletingParams) {
    store.dispatch(serviceAPI.endpoints.deleteCar.initiate(params));
  }

  createContext(): ICarServiceContext {
    return {
      createCar: this.createCar.bind(this),
      deleteCar: this.deleteCar.bind(this)
    }
  }
}