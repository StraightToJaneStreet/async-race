import './styles/base.css';
import App from './App';

const appRoot = document.createElement('div');
document.body.prepend(appRoot);

const app = new App(appRoot);
app.run();
