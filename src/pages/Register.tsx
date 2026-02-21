import React from 'react'

export const Register: React.FC<any> = ({ onRegister, onNavigate }) => {
	// 注册表单（用户名/密码/邮箱/角色选择）
	return (
		<section>
			<h2>用户注册</h2>
			<form onSubmit={(e) => e.preventDefault()}>
				<div>
					<label>用户名</label>
					<input name="username" placeholder="用户名" />
				</div>
				<div>
					<label>邮箱</label>
					<input name="email" type="email" placeholder="邮箱" />
				</div>
				<div>
					<label>密码</label>
					<input name="password" type="password" placeholder="密码" />
				</div>
				<div>
					<label>角色</label>
					<select name="role">
						<option value="merchant">商户</option>
						<option value="admin">管理员</option>
					</select>
				</div>
				<div>
					<button type="submit">注册（示意）</button>
					<button type="button" onClick={() => onNavigate('login')}>已有账号，去登录</button>
				</div>
			</form>
		</section>
	)
}

export default Register
