import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { MswProvider } from './components/MswWrapper.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MswProvider>
      <App />
    </MswProvider>
  </StrictMode>,
);
