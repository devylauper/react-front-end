import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import AppContainer from './layout/AppContainer';
import configureStore, {history} from './redux/configureStore';
import '../styles/vendor/vendor.less';
import '../styles/site/site.scss';

const store = configureStore();

render(
	<Provider store={store}>
		<AppContainer history={history} />
	</Provider>,
	document.getElementById('root')
);
