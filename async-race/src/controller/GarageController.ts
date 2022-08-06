import { Car } from "../core/Car";
import { actionAddCar, actionAddCars } from "../model/feature/garage/slice";
import store from "../model/store";

export default class GarageController {
  protected addCar(car: Car): void {
    store.dispatch(actionAddCar(car))
  }

  protected addCars(cars: Car[]): void {
    store.dispatch(actionAddCars(cars));
  }

  createCar(name: string, color: string) {
    this.addCar({id: 0, name, color});
  }

  generateCars() {

  }
}
