import React, { useState } from 'react';

import Page from '../core/Page';

import Garage from './Pages/Garage';
import Winners from './Pages/Winners';

import Button from './components/Button';

const Main = () => {
  const [page, setPage] = useState(Page.Garage);

  const navToGaragePage = () => setPage(Page.Garage);
  const navToWinnersPage = () => setPage(Page.Winners);

  return (
    <div className="application">
      <div className="application__wip-header">I need 1 more day.</div>
      <div className="application__heading">
        <Button label="To garage" handleClick={navToGaragePage} />
        <Button label="To winners" handleClick={navToWinnersPage} />
      </div>
      {page === Page.Garage ? <Garage /> : page === Page.Winners ? <Winners /> : <p>Invalid page</p>}
    </div>
  );
};

export default Main;
