import React from 'react'

export const HotelForm: React.FC<any> = ({ hotel, mode = 'create' }) => {
	// 酒店信息录入/编辑表单（仅结构）
	return (
		<section>
			<h2>{mode === 'edit' ? '编辑酒店信息' : '新增酒店'}</h2>
			<form onSubmit={(e) => e.preventDefault()}>
				<div>
					<label>酒店中文名 / 英文名</label>
					<input name="name_cn" placeholder="中文名" />
					<input name="name_en" placeholder="英文名（可选）" />
				</div>

				<div>
					<label>地址</label>
					<input name="address" placeholder="酒店地址" />
				</div>

				<div>
					<label>星级</label>
					<select name="star">
						<option>请选择</option>
						<option>5</option>
						<option>4</option>
						<option>3</option>
						<option>2</option>
						<option>1</option>
					</select>
				</div>

				<div>
					<label>房型（示意）</label>
					<textarea name="room_types" placeholder="列出房型，或使用表格管理" />
				</div>

				<div>
					<label>价格</label>
					<input name="price" placeholder="基础价（数值）" />
				</div>

				<div>
					<label>开业时间</label>
					<input name="open_date" type="date" />
				</div>

				<div>
					<label>可选信息：附近景点 / 交通 / 商场</label>
					<textarea name="extras" placeholder="可选项描述" />
				</div>

				<div>
					<label>优惠信息（示意）</label>
					<textarea name="discounts" placeholder="节日优惠、套餐等" />
				</div>

				<div>
					<button type="submit">保存（示意）</button>
				</div>
			</form>
		</section>
	)
}

export default HotelForm
