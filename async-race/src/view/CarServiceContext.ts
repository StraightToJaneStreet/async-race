import { createContext } from 'react';
import { ICarServiceContext, defaultCarServiceContext } from '../services/CarService';

export default createContext<ICarServiceContext>(defaultCarServiceContext);
