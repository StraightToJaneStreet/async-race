import React, { useState } from 'react';

import Page from '../core/Page';

import Garage from './Pages/Garage';
import Winners from './Pages/Winners';

import Button from './components/Button';
import { useSelector } from 'react-redux';
import { storeSelectWinnerMessage } from '../model/store';

const Main = () => {
  const [page, setPage] = useState(Page.Garage);

  const navToGaragePage = () => setPage(Page.Garage);
  const navToWinnersPage = () => setPage(Page.Winners);

  const { winner } = useSelector(storeSelectWinnerMessage);
  
  return (
    <>
      <div className="application">
        <div className="application__heading">
          <Button label="To garage" handleClick={navToGaragePage} />
          <Button label="To winners" handleClick={navToWinnersPage} />
        </div>
        {page === Page.Garage ? <Garage /> : page === Page.Winners ? <Winners /> : <p>Invalid page</p>}
      </div>

      {winner !== null && 
        <div className="overlay">
          <div className="overlay__content">
            <p className="winner-message">{`Winner: ${winner.name}(${winner.time})`}</p>
          </div>
        </div>
      }
    </>
  );
};

export default Main;
