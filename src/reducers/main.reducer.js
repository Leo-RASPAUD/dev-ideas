import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './app.reducer';

const mainReducer = combineReducers({
    router: routerReducer,
    app: appReducer,
});

export default mainReducer;
