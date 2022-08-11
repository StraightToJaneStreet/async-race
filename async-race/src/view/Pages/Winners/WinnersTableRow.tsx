import React from 'react';

import { IWinner } from '../../../core/IWinner';
import serviceAPI from '../../../model/service/serviceAPI';

import CarModel from '../../components/Car';

interface WinnersTableRowProps {
  position: number;
  winner: IWinner;
}

export default function WinnersTableRow({ position, winner }: WinnersTableRowProps) {
  const { data: car } = serviceAPI.useReadCarQuery({ id: winner.id });

  const content =
    car === undefined ? (
      <div className="winners-table__loading-placeholder">Loading...</div>
    ) : (
      <>
        <div className="winners-table__column winners-table__column--number">{position}</div>
        <div className="winners-table__column winners-table__column--car">
          <CarModel color={car.color} trackProgress={0} />
        </div>
        <div className="winners-table__column winners-table__column--name">{car.name}</div>
        <div className="winners-table__column winners-table__column--wins">{winner.wins}</div>
        <div className="winners-table__column winners-table__column--time">{winner.time}</div>
      </>
    );

  return <div className="winners-table__row">{content}</div>;
}
