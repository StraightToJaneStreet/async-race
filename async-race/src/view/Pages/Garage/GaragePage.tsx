import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Car } from '../../../core/Car';
import { CARS_PER_PAGE } from '../../../core/Contants';
import { selectCars } from '../../../model/feature/garage/slice';

import { actionDecrementPage, actionIncrementPage } from '../../../model/feature/garagePages';
import { RootState } from '../../../model/store';

import AppContext from '../../AppContext';

import Button from '../../components/Button';
import CreateCar from './CreateCar';
import UpdateCar from './UpdateCar';
import TrackList from '../../components/TrackList';

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

function GaragePage({ page, cars }: GaragePageProps) {
  const context = useContext(AppContext);

  const leftPaginationBorder = page * CARS_PER_PAGE;
  const rightPaginationBorder = leftPaginationBorder + CARS_PER_PAGE;

  const carsOnPage = cars.slice(
    leftPaginationBorder,
    rightPaginationBorder
  );

  const {
    handleRaceStart,
    handleGenerateCars,
    handleReset
  } = context;

  const dispatch = useDispatch();

  return (
    <div className="garage__page">
      <CreateCar/>
      <UpdateCar/>
      <div className="garage__buttons">
        <Button handleClick={() => handleRaceStart(carsOnPage.map((car) => car.id))} label='Race'/>
        <Button handleClick={handleReset} label='Reset'/>
        <Button handleClick={handleGenerateCars} label='Generate cars'/>
      </div>
      <h2 className="garage__cars-counter">Garage ({cars.length})</h2>
      <h3 className="garage__page-number">Page #{page + 1}</h3>
      <div className="garage__cars">
        <TrackList cars={carsOnPage}/>
      </div>
      <div className="garage__navigation">
        <Button
          label='Prev'
          enabled={page !== 0}
          handleClick={() => dispatch(actionDecrementPage())} />

        <Button label='Next' handleClick={() => dispatch(actionIncrementPage())} />
      </div>
    </div>
  )
}

export default connect(mapToState)(GaragePage);
