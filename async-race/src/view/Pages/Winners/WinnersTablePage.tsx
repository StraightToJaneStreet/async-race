import React from 'react';
import { IWinner } from '../../../core/IWinner';
import { OrderingField, OrderingType } from '../../../model/feature/winnersPage';
import serviceAPI from '../../../model/service/serviceAPI';

import WinnersTableRow from './WinnersTableRow';

interface WinnersTablePageProps {
  sortingField: OrderingField;
  sortingOrder: OrderingType;
  page: number;
}

const DEFAULT_ITEMS_PER_PAGE = 10;

export default function WinnersPage(props: WinnersTablePageProps) {
  const { page } = props;
  const { sortingField, sortingOrder } = props;

  const { data: fetchedWinners } = serviceAPI.useReadWinnersForPageQuery({
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    page,
    field: sortingField,
    order: sortingOrder,
  });

  const displayedWinners: IWinner[] = fetchedWinners === undefined ? [] : fetchedWinners.items;
  const positionShift = (page - 1) * DEFAULT_ITEMS_PER_PAGE;

  return (
    <>
      {displayedWinners.map((winner, position) => (
        <WinnersTableRow key={winner.id} position={position + positionShift + 1} winner={winner} />
      ))}
    </>
  );
}
