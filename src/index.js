import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import thunkMiddleware from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import mainReducer from 'reducers/main.reducer';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import App from 'components/App/App.container';
import Amplify from 'aws-amplify';
import './assets/app.css';
import amplifyConfig from 'config/amplify';
import 'animate.css';

Amplify.configure(amplifyConfig);

const history = createHistory();

const composeFunctions = [
    applyMiddleware(thunkMiddleware),
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(
        loadingBarMiddleware({
            promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'FAILURE'],
        }),
    ),
];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    composeFunctions.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(mainReducer, compose(...composeFunctions));
const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
    },
    overrides: {
        MuiFormLabel: {
            root: {
                color: blue[500],
            },
        },
        MuiInput: {
            root: {
                color: blue[500],
            },
            disabled: {
                color: `${blue[500]} !important`,
                cursor: 'text',
                '&:before': {
                    borderBottom: `1px solid ${blue[500]} !important`,
                },
            },
        },
        MuiPaper: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.18)',
            },
        },
    },
});

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
