import { combineReducers } from 'redux';
import serviceSlice from './serviceReducer';

const rootReducer = combineReducers({ service: serviceSlice });
export default rootReducer;
