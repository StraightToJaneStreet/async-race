import { createContext } from 'react';

import IRacingServiceContext, { defaultImplementation } from '../../services/contexts/IRacingServiceContext';

export default createContext<IRacingServiceContext>(defaultImplementation);
