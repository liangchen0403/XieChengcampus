import React, { useEffect, useState } from 'react'
import { HotelList } from './HotelList'
import { HotelForm } from './HotelForm'
import { fetchMerchantHotels } from '../utils/mockApi'

export const MerchantDashboard: React.FC<any> = ({ user }) => {
	// 商户面板：我的酒店列表 + 新增/编辑入口
	const [hotels, setHotels] = useState<any[]>([])

	useEffect(() => {
		const id = user?.id || 'm1'
		fetchMerchantHotels(id).then((data) => setHotels(data))
	}, [user])

	return (
		<section>
			<h2>商户控制台</h2>
			<p>商户：{user?.username || '示意用户'}</p>

			<div>
				<h3>我的酒店</h3>
				<HotelList hotels={hotels} />
			</div>

			<div>
				<h3>新增 / 编辑 酒店（骨架）</h3>
				<HotelForm />
			</div>
		</section>
	)
}

export default MerchantDashboard
