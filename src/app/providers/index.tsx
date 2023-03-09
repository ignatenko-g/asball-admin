import { Alert } from 'antd';
import { Provider } from 'react-redux';
import { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store/config/config';
import { AuthProvider } from './authProvider/ui/ui';

const { ErrorBoundary } = Alert;

interface MainProviderProps {
  children: ReactNode;
}

export const MainProvider: FC<MainProviderProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>{children}</AuthProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};
