import React, { useEffect, useState } from 'react'
import { HotelList } from './HotelList'
import { fetchPendingHotels } from '../utils/mockApi'

export const AdminPanel: React.FC<any> = ({ user }) => {
	// 管理员面板：审核队列、发布/下线管理
	const [pending, setPending] = useState<any[]>([])

	useEffect(() => {
		fetchPendingHotels().then((data) => setPending(data))
	}, [])

	return (
		<section>
			<h2>管理员审核中心</h2>
			<p>管理员：{user?.username || '示意管理员'}</p>

			<div>
				<h3>待审核的酒店（示意）</h3>
				<HotelList hotels={pending} />
				<div>
					{/* 审核/发布/下线 操作按钮 */}
				</div>
			</div>
		</section>
	)
}

export default AdminPanel
