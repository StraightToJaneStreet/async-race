import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { RootState } from '../model/store';
import Page from '../core/Page';

import Context from './Context';

import Winners from './Pages/Winners';
import Garage from './Pages/Garage';
import Button from './components/Button';

interface StateProps {
  currentPage: Page
}

const mapState = (state: RootState): StateProps => ({ currentPage: state.pages.value });

const Main = (props: StateProps) => {
  const { setPage } = useContext(Context);

  return (
    <>
      <Button handleClick={() => setPage(Page.Garage)} label='To garage'/>
      <Button handleClick={() => setPage(Page.Winners)} label='To winners'/>
      {
        props.currentPage === Page.Garage
        ? <Garage/>
        : props.currentPage === Page.Winners
          ? <Winners/>
          : <p>Invalid page</p>
      }
    </>
  );
}

export default connect(mapState)(Main);

