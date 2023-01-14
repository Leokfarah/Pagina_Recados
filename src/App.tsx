import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from './config/theme/Theme';
import { AppRoutes } from './routes/Routes';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider theme={Theme}>
                    <CssBaseline />
                    <AppRoutes />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
