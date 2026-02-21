import React from 'react'

export const Nav: React.FC<any> = ({ user, onNavigate, onLogout }) => {
  return (
    <header className="nav">
      <div className="nav-left">
        <h1>酒店管理</h1>
      </div>
      <nav className="nav-right">
        <button onClick={() => onNavigate('home')}>首页</button>
        {!user && (
          <>
            <button onClick={() => onNavigate('login')}>登录</button>
            <button onClick={() => onNavigate('register')}>注册</button>
          </>
        )}
        {user && user.role === 'merchant' && (
          <>
            <button onClick={() => onNavigate('merchant')}>我的酒店</button>
            <button onClick={() => onNavigate('merchant')}>新增酒店</button>
            <button onClick={onLogout}>登出 ({user.username})</button>
          </>
        )}
        {user && user.role === 'admin' && (
          <>
            <button onClick={() => onNavigate('admin')}>审核中心</button>
            <button onClick={onLogout}>登出 ({user.username})</button>
          </>
        )}
      </nav>
    </header>
  )
}
