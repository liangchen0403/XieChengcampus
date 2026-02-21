import React, { useEffect, useState } from 'react'
import './App.css'
import { Nav } from './components/Nav'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { MerchantDashboard } from './pages/MerchantDashboard'
import { AdminPanel } from './pages/AdminPanel'
import { getCurrentUserFromStorage, logout } from './utils/storage'

type View = 'login' | 'register' | 'merchant' | 'admin' | 'home'

function App() {
  const [view, setView] = useState<View>('home')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const u = getCurrentUserFromStorage()
    if (u) {
      setUser(u)
      setView(u.role === 'admin' ? 'admin' : 'merchant')
    }
  }, [])

  const handleLogin = (u: any) => {
    setUser(u)
    setView(u.role === 'admin' ? 'admin' : 'merchant')
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    setView('home')
  }

  return (
    <div className="app-root">
      <Nav
        user={user}
        onNavigate={(v: View) => setView(v)}
        onLogout={handleLogout}
      />

      <main className="container">
        {view === 'home' && (
          <div>
            <h2>欢迎使用酒店信息管理系统（PC）</h2>
            <p>请选择登录或注册（商户 / 管理员）以继续。</p>
          </div>
        )}

        {view === 'login' && <Login onLogin={handleLogin} onNavigate={setView} />}
        {view === 'register' && <Register onRegister={handleLogin} onNavigate={setView} />}

        {view === 'merchant' && user && user.role === 'merchant' && (
          <MerchantDashboard user={user} />
        )}

        {view === 'admin' && user && user.role === 'admin' && (
          <AdminPanel user={user} />
        )}
      </main>
    </div>
  )
}

export default App
