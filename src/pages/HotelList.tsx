import React from 'react'

export const HotelList: React.FC<any> = ({ hotels = [] }) => {
	// 酒店列表
	return (
		<section>
			<h2>酒店列表</h2>
			<table>
				<thead>
					<tr>
						<th>酒店名（中/英）</th>
						<th>地址</th>
						<th>星级</th>
						<th>房型</th>
						<th>价格</th>
						<th>开业时间</th>
						<th>状态</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					{hotels.length === 0 && (
						<tr>
							<td colSpan={8}>暂无数据（骨架示意）</td>
						</tr>
					)}
					{hotels.map((h: any) => (
						<tr key={h.id}>
							<td>
								<div>{h.name_cn}</div>
								<div style={{ color: '#666', fontSize: 12 }}>{h.name_en}</div>
							</td>
							<td>{h.address}</td>
							<td>{h.star}</td>
							<td>{Array.isArray(h.room_types) ? h.room_types.join(' / ') : h.room_types}</td>
							<td>{h.price}</td>
							<td>{h.open_date}</td>
							<td>{h.status || '-'}</td>
							<td>
								<button>查看</button>
								<button>编辑</button>
								<button>删除</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	)
}

export default HotelList
