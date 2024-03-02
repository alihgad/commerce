import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';
import TokenContextProvider from './Context/TokenContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClientProvider ,QueryClient } from 'react-query';
import CartContexstProvider from './Context/CartContext';

  const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <CartContexstProvider>
    <TokenContextProvider>

      <App />

    </TokenContextProvider>
    </CartContexstProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

