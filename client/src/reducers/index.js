import {AuthReducer} from './AuthReducer';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import streamReducer from '../reducers/streamReducer';

export default combineReducers({
    auth: AuthReducer,
    form: formReducer,
    streams: streamReducer
})