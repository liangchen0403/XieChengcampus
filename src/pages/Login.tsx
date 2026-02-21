import React from 'react'

export const Login: React.FC<any> = ({ onLogin, onNavigate }) => {
	// 用户名/密码输入、角色选择、提交与导航
	return (
		<section>
			<h2>用户登录</h2>
			<form onSubmit={(e) => e.preventDefault()}>
				<div>
					<label>用户名</label>
					<input name="username" placeholder="请输入用户名" />
				</div>
				<div>
					<label>密码</label>
					<input name="password" type="password" placeholder="请输入密码" />
				</div>
				<div>
					<label>角色</label>
					<select name="role">
						<option value="merchant">商户</option>
						<option value="admin">管理员</option>
					</select>
				</div>
				<div>
					<button type="submit">登录（示意）</button>
					<button type="button" onClick={() => onNavigate('register')}>去注册</button>
				</div>
			</form>
		</section>
	)
}

export default Login
