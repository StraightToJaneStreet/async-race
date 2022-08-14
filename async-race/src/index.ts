import './styles/base.css';

import DIContainer from './DIContainer';
import { TYPES } from './InjectionTypes';
import IApplication from './IApplication';

const appRoot = document.createElement('div');
document.body.prepend(appRoot);

const app = DIContainer.get<IApplication>(TYPES.App);
app.run(appRoot);
