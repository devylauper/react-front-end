import React from 'react';
import {Route, Switch} from 'react-router';
import {ConnectedRouter} from 'connected-react-router';

import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Error from '../pages/Error';

const AppContainer = ({history}) => (
	<ConnectedRouter history={history}>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/view/:personId" component={Detail} />
			<Route component={Error} />
		</Switch>
	</ConnectedRouter>
);

export default AppContainer;
