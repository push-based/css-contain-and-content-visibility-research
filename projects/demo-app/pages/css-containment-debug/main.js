// Main JavaScript file - CSS Containment Debug Tool
console.log('CSS Containment Debug Tool loaded successfully!');

// Import stylesheets
import './style.css';
import { layoutWorkTmpl } from './layout.work';
import { paintWorkTmpl } from './paint.work';
import { setupTargetConfig } from './contain-buttons';
import { setupTargetWork } from './work-insert-buttons';
import { setupWorkTrigger } from './work-trigger-buttons';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing CSS Containment Debug Tool...');
  
  const workMap = {
    layout: layoutWorkTmpl,
    paint: paintWorkTmpl,
  };
  
  const appDiv = document.body;
  const containerPanelDiv = document.getElementById('container-panel');
  const containerMainDiv = document.getElementById('container-main');
  const headerPanel = document.getElementById('header-panel');

  // Setup the debug tool components
  setupTargetWork(headerPanel, containerMainDiv);
  setupTargetConfig(headerPanel, containerMainDiv);
  setupWorkTrigger(containerPanelDiv);
  
  console.log('CSS Containment Debug Tool initialized successfully!');
});
