import { createContext } from "react";
import {
  ICarServiceContext,
  defaultCarServiceContext
} from "../controller/CarSevice";

export default createContext<ICarServiceContext>(defaultCarServiceContext);