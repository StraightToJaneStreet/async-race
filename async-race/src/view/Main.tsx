import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { RootState } from '../model/store';
import Page from '../core/Page';

import Context from './AppContext';

import Winners from './Pages/Winners';
import Garage from './Pages/Garage';
import Button from './components/Button';

interface StateProps {
  currentPage: Page
}

const mapState = (state: RootState): StateProps => ({ currentPage: state.pages.value });

const Main = (props: StateProps) => {
  const context = useContext(Context);
  const { handleSetPage } = context;

  return (
    <>
      <Button handleClick={() => handleSetPage(Page.Garage)} label='To garage'/>
      <Button handleClick={() => handleSetPage(Page.Winners)} label='To winners'/>
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

