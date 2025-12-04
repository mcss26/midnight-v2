import { applyLayout } from './app-layout.js';
import { getPageConfig } from './app-pages.js';

const filename = window.location.pathname.split('/').pop();
const config = getPageConfig(filename);
applyLayout(config);
