import ReactDOM from 'react-dom/client';
import { MainProvider } from 'app/providers';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <MainProvider>
    <App />
  </MainProvider>
);
