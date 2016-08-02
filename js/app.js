/**
 * jiangyukun on 2016/07/27 10:00
 */
import React from 'react'
import {render} from 'react-dom'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'

import ChatApp from './components/ChatApp'
import ChatPanel from './components/ChatPanel'
import Signin from './components/Signin'

import '../css/chat.scss'

const routerConfig = [
	{
		path: '/chat/index',
		component: ChatApp,
		childRoutes: [
			{
				path: 'index',
				component: ChatPanel
			}
		]
	},
	{
		path: '/signin',
		component: Signin,
	},
	{
		path: '/',
		component: Signin,
	}
];

render(
	<Router routes={routerConfig} history={hashHistory}>
	</Router>,
	document.getElementById('container')
);
