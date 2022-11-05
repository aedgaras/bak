import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { UserContext, userContextValues } from './context/UserContext';
import reportWebVitals from './reportWebVitals';
import { AppRouter } from './router/AppRouter';

import * as serviceWorker from './serviceWorker';
import { NavigationMenu } from './ui/components/navigation/NavigationMenu';
import { AppWrapper } from './ui/components/wrappers/AppWrapper';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
    <React.StrictMode>
        <ColorModeScript />
        <ChakraProvider theme={theme}>
            <UserContext.Provider value={userContextValues()}>
                <AnimatePresence exitBeforeEnter>
                    <BrowserRouter>
                        <NavigationMenu />
                        <AppWrapper>
                            <AppRouter />
                        </AppWrapper>
                    </BrowserRouter>
                </AnimatePresence>
            </UserContext.Provider>
        </ChakraProvider>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
