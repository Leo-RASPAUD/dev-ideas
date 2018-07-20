import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loginReducer from './login.reducer';

const mainReducer = combineReducers({
    router: routerReducer,
    login: loginReducer,
});

export default mainReducer;
