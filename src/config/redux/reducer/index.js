import { combineReducers } from 'redux';
import AuthReducer from './Auth';


const reducer = combineReducers({
    'AuthReducer': AuthReducer,
});

export default reducer;