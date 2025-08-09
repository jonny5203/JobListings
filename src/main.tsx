import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/main.css';
import { DataProvider } from './context/DataContext';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
