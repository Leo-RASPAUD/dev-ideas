import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import loginReducer from './login.reducer';
import appReducer from './app.reducer';

const mainReducer = combineReducers({
    loadingBar: loadingBarReducer,
    router: routerReducer,
    app: appReducer,
    login: loginReducer,
});

export default mainReducer;
