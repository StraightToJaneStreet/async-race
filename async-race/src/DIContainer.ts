import { Container } from 'inversify';
import 'reflect-metadata';

import { TYPES } from './InjectionTypes';

import ICarService from './services/interfaces/ICarService';
import CarService from './services/CarService';

import IEngineAPIService from './services/interfaces/IEngineApiService';
import EngineApiService from './services/EngineApiService';

import IAnimationTickerService from './services/interfaces/IAnimationTicker';
import RealtimeTickerService from './services/RealtimeTickerService';

import IRacingService from './services/interfaces/IRacingService';
import RacingService from './services/RacingService';

import IWinnerService from './services/interfaces/IWinnersService';
import WinnersService from './services/WinnersService';

import IApplication from './IApplication';
import App from './App';

const DIContainer = new Container();

DIContainer.bind<IApplication>(TYPES.App).to(App);
DIContainer.bind<IRacingService>(TYPES.RacingService).to(RacingService).inSingletonScope();
DIContainer.bind<IWinnerService>(TYPES.WinnersService).to(WinnersService).inSingletonScope();
DIContainer.bind<ICarService>(TYPES.CarService).to(CarService).inSingletonScope();
DIContainer.bind<IAnimationTickerService>(TYPES.AnimationTickerService).to(RealtimeTickerService).inSingletonScope();
DIContainer.bind<IEngineAPIService>(TYPES.EngineApiService).to(EngineApiService).inSingletonScope();

export default DIContainer;
