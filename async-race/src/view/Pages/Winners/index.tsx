import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { storeSelectWinnersPageParams } from '../../../model/store';
import winnersPageSlice from '../../../model/feature/winnersPage';
import serviceAPI from '../../../model/service/serviceAPI';

import WinnersTable from './WinnersTable';
import Button from '../../components/Button';

export default function Winners() {
  const { data: winners } = serviceAPI.useReadWinnersQuery();
  const winnersCount = winners === undefined ? 0 : winners.length;

  const { currentPage: page } = useSelector(storeSelectWinnersPageParams);

  const { incrementPage, decrementPage } = winnersPageSlice.actions;

  const dispatch = useDispatch();

  return (
    <>
      <h2>Winners ({winnersCount})</h2>
      <WinnersTable page={page} />
      <Button label="Prev" enabled={page !== 1} handleClick={() => dispatch(decrementPage())} />
      <Button label="Next" handleClick={() => dispatch(incrementPage())} />
    </>
  );
}
