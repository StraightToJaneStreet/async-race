import React from 'react';

import {
  useDispatch,
  useSelector
} from 'react-redux';

import serviceAPI from '../../../model/service/serviceAPI';

import { storeSelectWinnersPageParams } from '../../../model/store';
import {
  actionIncrementPage,
  actionDecrementPage
} from '../../../model/feature/winnersTableParams';
import WinnersTable from './WinnersTable';
import Button from '../../components/Button';


export default function Winners() {
  const { data: winners } = serviceAPI.useReadWinnersQuery();
  const winnersCount = winners === undefined ? 0 : winners.length;

  const { page } = useSelector(storeSelectWinnersPageParams);

  const dispatch = useDispatch();

  return (
    <>
      <h2>Winners ({winnersCount})</h2>
      <WinnersTable page={page}/>
      <Button
        label='Prev'
        enabled={page !== 1}
        handleClick={() => dispatch(actionDecrementPage())} />
      <Button
        label='Next'
        handleClick={() => dispatch(actionIncrementPage())} />
    </>
  )
}
