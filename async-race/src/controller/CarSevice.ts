import serviceAPI, {
  CarCreationParams,
  CarDeletingParams,
} from '../model/service/serviceAPI';
import store from '../model/store';

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

export interface ICarServiceContext {
  createCar: (params: CarCreationParams) => void;
  deleteCar: (id: CarDeletingParams) => void;
  generateCars: () => void;
}

export const defaultCarServiceContext: ICarServiceContext = {
  createCar: defaultContextImplementation,
  deleteCar: defaultContextImplementation,
  generateCars: defaultContextImplementation,
}

export default class CarService {
  createCar(params: CarCreationParams) {
    store.dispatch(serviceAPI.endpoints.createCar.initiate(params));
  }

  deleteCar(params: CarDeletingParams) {
    store.dispatch(serviceAPI.endpoints.deleteCar.initiate(params));
  }

  generateCars() {
    const cars = Array(100).fill(0).map(() => randomCar());
    cars.forEach((params) => this.createCar(params))
  }

  createContext(): ICarServiceContext {
    return {
      createCar: this.createCar.bind(this),
      deleteCar: this.deleteCar.bind(this),
      generateCars: this.generateCars.bind(this)
    }
  }
}
