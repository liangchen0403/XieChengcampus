import React, { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import {Navigate} from 'react-router-dom'

import Welcome from '../pages/Welcome/Welcome'
import Login from '../pages/Login'

import MerchantHome from '../pages/Merchant/MerchantHome'
import HotelManage from '../pages/Merchant/HotelManage'
import Notice from '../pages/Merchant/Notice'
import HotelDetail from '../pages/Merchant/HotelDetail'

import Admin from '../pages/Admin/admin'
import ShowHotel from '../pages/Admin/ShowHotel'
import PendHotel from '../pages/Admin/pendHotel'
import PublishHotel from '../pages/Admin/publishHotel'

const MerchantDashboard = lazy(() => import('../pages/Merchant/Merchant'));

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
	// {
	// 	path: '/register',
	// 	element: (
	// 		<Suspense fallback={<div>加载中...</div>}>
	// 			<Register />
	// 		</Suspense>
	// 	),
	// },
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
				path:'Notice',
				element:<Notice/>
			},
			{
				path:'HotelDetail/:id',
				element:<HotelDetail/>
			},
		]
	},
	{
		path: '/admin',
		element: (
			<Admin />
		),
		children:[
			{
				path:'showHotel',
				element:<ShowHotel/>
			},
			{
				path:'pendHotel',
				element:<PendHotel/>
			},
			{
				path:'publishHotel',
				element:<PublishHotel/>
			},
		]
	},
];