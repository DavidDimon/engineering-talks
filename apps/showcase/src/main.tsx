import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/App.js';
import { I18nProvider } from './app/i18n.js';
import './styles.css';

const root = document.querySelector<HTMLElement>('#root');

if (!root) throw new Error('Showcase root element was not found.');

createRoot(root).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);
