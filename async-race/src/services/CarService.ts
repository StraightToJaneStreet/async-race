import garagePageSlice from '../model/feature/garagePage';

import updateCarConfigurationReducer from '../model/feature/updateCar';

import store, { storeSelectGaragePage } from '../model/store';
import serviceAPI from '../model/service/serviceAPI';

import { CarCreationParams, CarDeletingParams, CarUpdatingParams } from './contexts/ICarServiceContext';
import ICarServiceContext from './contexts/ICarServiceContext';

const carPrefixer = ['Audi', 'Tesla', 'BMW', 'Peugeot', 'Lada', 'Jaguar', 'Ford'];
const carSuffixes = ['Model A', 'Model B', 'A1', 'B2', 'C3', 'Kalina', 'Granta'];
const peek = <T>(items: T[]): T => {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
};

const randomColorPart = (): string => Math.floor(Math.random() * 255).toString(16);
const randomColor = (): string => {
  const r = randomColorPart();
  const g = randomColorPart();
  const b = randomColorPart();

  return `#${r}${g}${b}`;
};

const randomCar = (): CarCreationParams => {
  const prefix = peek(carPrefixer);
  const suffix = peek(carSuffixes);
  const name = `${prefix} ${suffix}`;
  const color = randomColor();

  return { name, color };
};


export default class CarService {
  createCar(params: CarCreationParams) {
    store.dispatch(serviceAPI.endpoints.createCar.initiate(params));
  }

  deleteCar(params: CarDeletingParams) {
    store.dispatch(serviceAPI.endpoints.deleteCar.initiate(params));

    const garageParams = storeSelectGaragePage(store.getState());
    if (garageParams.carForUpdate === params.id) {
      const { removeCarForUpdate } = garagePageSlice.actions;
      store.dispatch(removeCarForUpdate());
    }

    const sub = store.dispatch(serviceAPI.endpoints.readWinner.initiate(params.id));
    sub.then(({ isSuccess }) => {
      if (isSuccess === false) {
        return;
      }
      store.dispatch(serviceAPI.endpoints.deleteWinner.initiate(params.id));
    });
  }

  generateCars() {
    const cars = Array(100)
      .fill(0)
      .map(() => randomCar());
    cars.forEach((params) => this.createCar(params));
  }

  updateCar(params: CarUpdatingParams) {
    const garageParams = storeSelectGaragePage(store.getState());
    const selectedCar = garageParams.carForUpdate;
    if (selectedCar === null) {
      return;
    }

    store.dispatch(serviceAPI.endpoints.updateCar.initiate({ id: selectedCar, ...params }));
  }

  selectCarForUpdate(id: number) {
    const { setCarForUpdate } = garagePageSlice.actions;
    store.dispatch(setCarForUpdate(id));

    const sub = store.dispatch(serviceAPI.endpoints.readCar.initiate({ id }));
    sub.then(({ data }) => {
      if (data === undefined) {
        return;
      }
      const { setColor, setName } = updateCarConfigurationReducer.actions;
      store.dispatch(setName(data.name));
      store.dispatch(setColor(data.color));
    });
  }

  createContext(): ICarServiceContext {
    return {
      createCar: this.createCar.bind(this),
      updateCar: this.updateCar.bind(this),
      deleteCar: this.deleteCar.bind(this),
      generateCars: this.generateCars.bind(this),
      selectCarForUpdate: this.selectCarForUpdate.bind(this),
    };
  }
}
