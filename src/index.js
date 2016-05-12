import React from 'react'
import {render} from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'


import App from './App'

import About from './modules/About'
import Cities from './modules/Cities'
import City from './modules/City'



render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="/about" component={About}/>
			<Route path="/cities" component={Cities}/>
			<Route path="/city/:id" component={City}/>
		</Route>
	</Router>
), document.getElementById('app'))
