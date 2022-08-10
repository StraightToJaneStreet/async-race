import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Car } from '../../../core/Car';
import { selectCars } from '../../../model/feature/garage/slice';

import { actionDecrementPage, actionIncrementPage } from '../../../model/feature/garagePages';
import { RootState } from '../../../model/store';

import AppContext from '../../AppContext';

import Button from '../../components/Button';
import CreateCar from './CreateCar';
import UpdateCar from './UpdateCar';
import TrackList from '../../components/TrackList';

import serviceAPI from '../../../model/service/serviceAPI';

interface GaragePageProps {
  page: number;
  cars: Car[];
}

const mapToState = (state: RootState): GaragePageProps => {
  return {
    page: state.garagePage.currentPage,
    cars: selectCars(state.garage)
  };
}

const CARS_PER_GARAGE_PAGE = 7;

function GaragePage({ page }: GaragePageProps) {
  const context = useContext(AppContext);

  const {
    handleRaceStart,
    handleReset
  } = context;

  const dispatch = useDispatch();

  const { data: carsState,  } = serviceAPI.useReadCarsForPageQuery({
    page,
    itemsPerPage: CARS_PER_GARAGE_PAGE
  });

  const carsOnPage: Car[] = carsState === undefined ? [] : carsState.cars;
  const totalCount: number = carsState === undefined ? 0 : carsState.total;

  return (
    <div className="garage__page">
      <CreateCar/>
      <UpdateCar/>
      <div className="garage__buttons">
        <Button handleClick={() => handleRaceStart(carsOnPage.map((car) => car.id))} label='Race'/>
        <Button handleClick={handleReset} label='Reset'/>
        <Button handleClick={() => {}} label='Generate cars'/>
      </div>
      <h2 className="garage__cars-counter">Garage ({totalCount})</h2>
      <h3 className="garage__page-number">Page #{page}</h3>
      <div className="garage__cars">
        <TrackList cars={carsOnPage}/>
      </div>
      <div className="garage__navigation">
        <Button
          label='Prev'
          enabled={page !== 1}
          handleClick={() => dispatch(actionDecrementPage())} />

        <Button label='Next' handleClick={() => dispatch(actionIncrementPage())} />
      </div>
    </div>
  )
}

export default connect(mapToState)(GaragePage);
