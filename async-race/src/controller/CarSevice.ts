import { actionRemoveCarForUpdate, actionSetCarForUpdate } from '../model/feature/garagePageProperties';
import { actionSetColor, actionSetName } from '../model/feature/updateCar';
import serviceAPI, {
  CarCreationParams,
  CarDeletingParams,
} from '../model/service/serviceAPI';
import store, { storeSelectGaragePage } from '../model/store';

const carPrefixer = ['Audi', 'Tesla', 'BMW', 'Peugeot', 'Lada', 'Jaguar', 'Ford'];
const carSuffixes = ['Model A', 'Model B', 'A1', 'B2', 'C3', 'Kalina', 'Granta'];
const peek = <T>(items: T[]): T => {
  const index = Math.floor(Math.random() * (items.length));
  return items[index];
}
const randomColorPart = (): string => Math.floor(Math.random() * 255).toString(16);
const randomColor = (): string => {
  const r = randomColorPart();
  const g = randomColorPart();
  const b = randomColorPart();

  return `#${r}${g}${b}`;
}
const randomCar = (): CarCreationParams => {
  const prefix = peek(carPrefixer);
  const suffix = peek(carSuffixes);
  const name = `${prefix} ${suffix}`;
  const color = randomColor();

  return { name, color };
}

function defaultContextImplementation(..._ags: unknown[]): void {}

interface CarUpdatingParams {
  name: string;
  color: string;
}

export interface ICarServiceContext {
  createCar: (params: CarCreationParams) => void;
  deleteCar: (id: CarDeletingParams) => void;
  updateCar: (params: CarUpdatingParams) => void;
  generateCars: () => void;
  selectCarForUpdate: (id: number) => void;
}

export const defaultCarServiceContext: ICarServiceContext = {
  createCar: defaultContextImplementation,
  deleteCar: defaultContextImplementation,
  updateCar: defaultContextImplementation,
  generateCars: defaultContextImplementation,
  selectCarForUpdate: defaultContextImplementation,
}

export default class CarService {
  createCar(params: CarCreationParams) {
    store.dispatch(serviceAPI.endpoints.createCar.initiate(params));
  }

  deleteCar(params: CarDeletingParams) {
    store.dispatch(serviceAPI.endpoints.deleteCar.initiate(params));

    const garageParams = storeSelectGaragePage(store.getState());
    if (garageParams.carIdForUpdate === params.id) {
      store.dispatch(actionRemoveCarForUpdate());
    }

    const sub = store.dispatch(serviceAPI.endpoints.readWinner.initiate(params.id));
    sub.then(({isSuccess}) => {
      if (isSuccess === false) {
        return;
      }
      store.dispatch(serviceAPI.endpoints.deleteWinner.initiate(params.id));
    })
  }

  generateCars() {
    const cars = Array(100).fill(0).map(() => randomCar());
    cars.forEach((params) => this.createCar(params))
  }

  updateCar(params: CarUpdatingParams) {
    const garageParams = storeSelectGaragePage(store.getState());
    const selectedCar = garageParams.carIdForUpdate;
    if (selectedCar === null) {
      return;
    }
    store.dispatch(serviceAPI.endpoints.updateCar.initiate({ id: selectedCar, ...params }));
  }

  selectCarForUpdate(id: number) {
    store.dispatch(actionSetCarForUpdate(id));
    const sub = store.dispatch(serviceAPI.endpoints.readCar.initiate({ id }));
    sub.then(({ data }) => {
      if (data === undefined) {
        return;
      }
      store.dispatch(actionSetName(data.name));
      store.dispatch(actionSetColor(data.color));
    })
  }

  createContext(): ICarServiceContext {
    return {
      createCar: this.createCar.bind(this),
      updateCar: this.updateCar.bind(this),
      deleteCar: this.deleteCar.bind(this),
      generateCars: this.generateCars.bind(this),
      selectCarForUpdate: this.selectCarForUpdate.bind(this),
    }
  }
}
