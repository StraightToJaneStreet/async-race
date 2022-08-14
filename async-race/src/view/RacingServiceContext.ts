import { createContext } from 'react';

import { defaultRacingServiceContext, IRacingServiceContext } from '../services/RacingService';

export default createContext<IRacingServiceContext>(defaultRacingServiceContext);
