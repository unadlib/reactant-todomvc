import { render } from 'reactant-web';
import { createApp } from 'reactant';
import { AppView } from './app.view';
import 'todomvc-app-css/index.css';

const app = createApp({
  modules: [],
  main: AppView,
  render,
});

app.bootstrap(document.getElementById('app'));
