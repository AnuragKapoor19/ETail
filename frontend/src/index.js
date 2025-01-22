import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Provider from './contextAPI';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <App />
    </Provider>
  </React.StrictMode>
);

