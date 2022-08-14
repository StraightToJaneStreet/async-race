import { createContext } from 'react';

import ICarServiceContext, { defaultImplementation } from '../../services/contexts/ICarServiceContext';

export default createContext<ICarServiceContext>(defaultImplementation);
