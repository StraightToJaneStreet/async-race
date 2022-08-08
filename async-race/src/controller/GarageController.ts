import { Car } from "../core/Car";
import { actionAddCar, actionAddCars, actionDeleteCar } from "../model/feature/garage/slice";
import ApiService from './ApiService';
import CarRandomizationService from './CarRandomizationService';

import store from "../model/store";

export default class GarageController {
  protected api: ApiService;
  protected carRandomizer: CarRandomizationService;

  protected modelAddCar(car: Car): void {
    store.dispatch(actionAddCar(car));
  }

  protected modelAddCars(cars: Car[]): void {
    store.dispatch(actionAddCars(cars));
  }

  protected modelRemoveCar(carId: number): void {
    store.dispatch(actionDeleteCar(carId));
  }

  protected loadCars() {
    this.api.loadCars()
      .then((cars) => this.modelAddCars(cars));
  }

  constructor() {
    this.api = ApiService.getInstance();
    this.carRandomizer = CarRandomizationService.getInstance();
  }

  initialize() {
    this.loadCars();
  }

  createCar(name: string, color: string) {
    const service = ApiService.getInstance();
    service
      .createCar(name, color)
      .then((id) => this.modelAddCar({id, name, color}));
  }

  removeCar(carId: number) {
    const service = ApiService.getInstance();
    service
      .removeCar(carId)
      .then(() => this.modelRemoveCar(carId));
  }

  generateCars() {

  }
}
