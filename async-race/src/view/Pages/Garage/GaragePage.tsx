import React from 'react';
import {
  useDispatch,
  connect,
  useSelector
} from 'react-redux';

import { Car } from '../../../core/Car';

import { RootState, storeSelectTracks } from '../../../model/store';
import garagePageSlice from '../../../model/feature/garagePage';
import { selectllTracks } from '../../../model/feature/tracks';
import serviceAPI from '../../../model/service/serviceAPI';

import DIContainer from '../../../DIContainer';
import { TYPES } from '../../../InjectionTypes';
import ICarService from '../../../services/interfaces/ICarService';
import IRacingService from '../../../services/interfaces/IRacingService';

import Button from '../../components/Button';

import CreateCar from './CreateCar';
import UpdateCar from './UpdateCar';
import TrackList from './TrackList';


interface GaragePageProps {
  page: number;
}

const mapToState = (state: RootState): GaragePageProps => {
  return {
    page: state[garagePageSlice.name].currentPage,
  };
};

const CARS_PER_GARAGE_PAGE = 7;

function GaragePage({ page }: GaragePageProps) {
  const carService = DIContainer.get<ICarService>(TYPES.CarService);
  const racingService = DIContainer.get<IRacingService>(TYPES.RacingService);

  const { incrementPage, decrementPage } = garagePageSlice.actions;

  const dispatch = useDispatch();

  const { data: carsState } = serviceAPI.useReadCarsForPageQuery({
    page,
    itemsPerPage: CARS_PER_GARAGE_PAGE,
  });

  const carsOnPage: Car[] = carsState === undefined ? [] : carsState.items;
  const totalCount: number = carsState === undefined ? 0 : carsState.total;

  const idsOnPage = carsOnPage.map((car) => car.id);

  const state = useSelector(storeSelectTracks);
  const tracks = selectllTracks(state);

  const tracksOnPage = tracks.filter((track) => idsOnPage.includes(track.carId));
  const pageHasActiveTracks = tracksOnPage.length > 0;

  return (
    <div className="garage__page">
      <CreateCar />
      <UpdateCar />
      <div className="garage__buttons">
        <Button label="Race" enabled={!pageHasActiveTracks} handleClick={() => racingService.startRaceFor(idsOnPage)} />
        <Button label="Reset" enabled={pageHasActiveTracks} handleClick={() => racingService.resetRaceFor(idsOnPage)} />
        <Button label="Generate cars" handleClick={carService.generateCars} />
      </div>
      <h2 className="garage__cars-counter">Garage ({totalCount})</h2>
      <h3 className="garage__page-number">Page #{page}</h3>
      <div className="garage__cars">
        <TrackList cars={carsOnPage} />
      </div>
      <div className="garage__navigation">
        <Button label="Prev" enabled={page !== 1} handleClick={() => dispatch(decrementPage())} />

        <Button label="Next" handleClick={() => dispatch(incrementPage())} />
      </div>
    </div>
  );
}

export default connect(mapToState)(GaragePage);
