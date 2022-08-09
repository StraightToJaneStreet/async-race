import React from 'react';

function EngineStatus() {
  return (
    <span className='engine-status'>
      <span className='engine-status__state engine-status__state--start'></span>
      <span className='engine-status__broken'>B</span>
    </span>
  )
}

export default EngineStatus;