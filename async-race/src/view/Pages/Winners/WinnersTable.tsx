import React from 'react';
import { useSelector } from 'react-redux';

import { storeSelectWinnersPageParams } from '../../../model/store';
import winnersPageSlice, { OrderingField } from '../../../model/feature/winnersPage';
import { OrderingType } from '../../../model/feature/winnersPage';
import WinnersTablePage from './WinnersTablePage';

import { useDispatch } from 'react-redux';

interface WinnersTableProps {
  page: number;
}

export default function WinnersTable({ page }: WinnersTableProps) {
  const { orderingField, orderingType } = useSelector(storeSelectWinnersPageParams);

  const sortByWins = orderingField === 'wins';
  const sortByTime = orderingField === 'time';

  const orderingSuffix = orderingType === OrderingType.Asc ? 'up' : 'down';

  const columnClass = 'winners-table__header-column';

  const sortingIndicatorClass = ` ${columnClass}--sort ${columnClass}--sort_${orderingSuffix}`;

  const columnWinsSortingIndicator = `${sortByWins ? sortingIndicatorClass : ''}`;
  const columnTimeSortingIndicator = `${sortByTime ? sortingIndicatorClass : ''}`;

  const { setOrderingType, setOrderingField } = winnersPageSlice.actions;

  const dispatch = useDispatch();

  const changeOrderingType = () => {
    const newOrderingType = orderingType === OrderingType.Asc ? OrderingType.Desc : OrderingType.Asc;
    dispatch(setOrderingType(newOrderingType));
  };

  const changeOrderingField = () => {
    const newOrderingField = orderingField === 'wins' ? 'time' : 'wins';
    dispatch(setOrderingField(newOrderingField));
  };

  const handleFieldClick = (field: OrderingField) => {
    if (field === orderingField) {
      changeOrderingType();
    } else {
      changeOrderingField();
    }
  };

  return (
    <div className="winners-table">
      <div className="winners-table__header">
        <div className={`${columnClass} ${columnClass}--position}`}>Position</div>
        <div className={`${columnClass} ${columnClass}--model`}>Model</div>
        <div className={`${columnClass} ${columnClass}--name`}>Name</div>
        <div
          onClick={() => handleFieldClick('wins')}
          className={`${columnClass} ${columnClass}--wins ${columnWinsSortingIndicator}`}
        >
          Wins
        </div>
        <div
          onClick={() => handleFieldClick('time')}
          className={`${columnClass} ${columnClass}--time ${columnTimeSortingIndicator}`}
        >
          Best result
        </div>
      </div>
      <WinnersTablePage page={page} sortingField={orderingField} sortingOrder={orderingType} />
    </div>
  );
}
