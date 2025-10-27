// Import stylesheets
import './style.css';
import { layoutWorkTmpl } from './layout.work';
import { paintWorkTmpl } from './paint.work';
import { setupTargetConfig } from './contain-buttons';
import { setupTargetWork } from './work-insert-buttons';
import { setupWorkTrigger } from './work-trigger-buttons';

const workMap = {
  layout: layoutWorkTmpl,
  paint: paintWorkTmpl,
};
const appDiv: HTMLElement = document.body;
const containerPanelDiv: HTMLElement =
  document.getElementById('container-panel');
const containerMainDiv: HTMLElement = document.getElementById('container-main');

const headerPanel = document.getElementById('header-panel');

setupTargetWork(headerPanel, containerMainDiv);
setupTargetConfig(headerPanel, containerMainDiv);
setupWorkTrigger(containerPanelDiv);
