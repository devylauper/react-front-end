import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
	const middlewares = [routerMiddleware(history), thunkMiddleware];
	const middlewareEnhancer = applyMiddleware(...middlewares);

	const enhancers = [middlewareEnhancer];
	const composedEnhancers = composeWithDevTools(...enhancers);

	const store = createStore(rootReducer(history), preloadedState, composedEnhancers);

	return store;
}
