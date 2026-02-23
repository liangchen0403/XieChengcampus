import React, { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import {Navigate} from 'react-router-dom'

import Welcome from '../pages/Welcome/Welcome'
import Login from '../components/Login/Login'
import Test from '../pages/Merchant/test'
import Test2 from '../pages/Merchant/test2'
const Register = lazy(() => import('../pages/Register'));
const MerchantDashboard = lazy(() => import('../pages/Merchant/Merchant'));
const AdminPanel = lazy(() => import('../pages/AdminPanel'));

export interface RouteConfig {
	path: string;
	element: ReactNode;
	children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
	{
        path: '/',
        element: <Navigate to="/welcome" replace />,
    },
    {
        path: '/welcome',
        element: <Welcome />,
    },
	{
		path: '/login',
		element: (
			<Suspense fallback={<div>加载中...</div>}>
				<Login />
			</Suspense>
		),
	},
	{
		path: '/register',
		element: (
			<Suspense fallback={<div>加载中...</div>}>
				<Register />
			</Suspense>
		),
	},
	{
		path: '/merchant',
		element: (
			<Suspense fallback={<div>加载中...</div>}>
				<MerchantDashboard />
			</Suspense>
		),
		children:[
			{
				path:'test',
				element:<Test/>
			},
			{
				path:'test2',
				element:<Test2/>
			},
		]
	},
	{
		path: '/admin',
		element: (
			<Suspense fallback={<div>加载中...</div>}>
				<AdminPanel />
			</Suspense>
		),
	},
];
