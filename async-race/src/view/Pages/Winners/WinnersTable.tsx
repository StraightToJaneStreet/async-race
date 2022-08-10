import React from 'react';
import { useSelector } from 'react-redux';
import { storeSelectWinnersPageParams } from '../../../model/store';

import WinnersTablePage from './WinnersTablePage';

interface WinnersTableProps {
  page: number;
}

export default function WinnersTable({ page }: WinnersTableProps) {
  const { orderingField, orderingType } = useSelector(storeSelectWinnersPageParams);

  return (
    <div className="winners-table">
      <div className="winners-table__header">
        <div className="winners-table__header-column winners-table__header-column--position">Position</div>
        <div className="winners-table__header-column winners-table__header-column--model">Model</div>
        <div className="winners-table__header-column winners-table__header-column--name">Name</div>
        <div className="winners-table__header-column winners-table__header-column--wins">Wins</div>
        <div className="winners-table__header-column winners-table__header-column--time">Best result</div>
      </div>
      <WinnersTablePage
        page={page}
        sortingField={orderingField}
        sortingOrder={orderingType} />
    </div>
  );
}
