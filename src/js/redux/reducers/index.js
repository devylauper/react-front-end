import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import request from './request';

export default (history) =>
	combineReducers({
		router: connectRouter(history),
		request
	});
