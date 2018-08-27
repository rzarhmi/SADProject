import {combineReducers} from 'redux';
import LogReducer from './log-reducer';


const rootReducer = combineReducers({
    log: LogReducer
});

export default rootReducer;