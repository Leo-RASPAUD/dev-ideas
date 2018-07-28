import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import login from './login.reducer';
import app from './app.reducer';
import home from './home.reducer';
import ideas from './ideas.reducer';

const mainReducer = combineReducers({
    loadingBar: loadingBarReducer,
    router: routerReducer,
    app,
    login,
    home,
    ideas,
});

export default mainReducer;
