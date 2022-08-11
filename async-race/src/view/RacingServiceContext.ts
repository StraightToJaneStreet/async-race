import { createContext } from 'react';

import { defaultRacingServiceContext, IRacingServiceContext } from '../controller/RacingService';

export default createContext<IRacingServiceContext>(defaultRacingServiceContext);
