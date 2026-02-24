import React, { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import {Navigate} from 'react-router-dom'

import Welcome from '../pages/Welcome/Welcome'
import Login from '../pages/Login'

import MerchantHome from '../pages/Merchant/MerchantHome'
import HotelManage from '../pages/Merchant/HotelManage'
import RoomManage from '../pages/Merchant/RoomManage'
import Notice from '../pages/Merchant/Notice'


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
				path:'MerchantHome',
				element:<MerchantHome/>
			},
			{
				path:'HotelManage',
				element:<HotelManage/>
			},
			{
				path:'RoomManage',
				element:<RoomManage/>
			},
			{
				path:'Notice',
				element:<Notice/>
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
