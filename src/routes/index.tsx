import React, { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import {Navigate} from 'react-router-dom'

import Welcome from '../pages/Welcome/Welcome'
const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register'));
const MerchantDashboard = lazy(() => import('../pages/MerchantDashboard'));
const AdminPanel = lazy(() => import('../pages/AdminPanel'));

export interface RouteConfig {
	path: string;
	element: ReactNode;
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
