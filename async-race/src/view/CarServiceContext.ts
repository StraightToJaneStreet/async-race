import { createContext } from "react";
import {
  ICarServiceContext,
  defaultCarServiceContext
} from "../controller/CarService";

export default createContext<ICarServiceContext>(defaultCarServiceContext);