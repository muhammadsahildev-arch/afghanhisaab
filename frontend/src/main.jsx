import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
      <Provider store={store}>
    <ToastContainer position="bottom-center" autoClose={5000} /> 
    <StrictMode>
    <App />
      </StrictMode>           
      </Provider>
  );
} else {
  console.error('Root element not found!');
}
