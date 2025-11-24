import { useState } from 'react'
// API 基礎網址
const API_BASE = typeof window !== 'undefined' ? '' : 'https://bangkokmrt.vercel.app'

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password.trim()) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE}/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      if (data.success && data.token) {
        // 成功登入，保存到 sessionStorage
        sessionStorage.setItem('adminAuthenticated', 'true')
        sessionStorage.setItem('authToken', data.token)
        sessionStorage.setItem('loginTime', Date.now().toString())
        onLogin()
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message === 'Invalid credentials' ? '密碼錯誤，請重新輸入' : '登入失敗，請稍後再試')
      setPassword('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full bg-ios-dark-background text-ios-dark-label overflow-hidden">
      <div className="h-full flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-primary-blue">
              <span className="material-symbols-outlined text-white text-2xl">
                admin_panel_settings
              </span>
            </div>
            <h1 className="text-2xl font-bold font-sf-pro-display text-ios-dark-label mb-2">
              Admin Access
            </h1>
            <p className="text-ios-dark-secondary-label text-sm">
              Enter password to access admin panel
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-ios-dark-secondary-label mb-3">
                <span className="material-symbols-outlined text-lg">lock</span>
                <span>Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-ios-dark-secondary-background/70 text-ios-dark-label border border-ios-dark-separator hover:border-primary-blue/50 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 rounded-xl px-4 py-3 transition-all"
                disabled={isLoading}
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-sm mt-2 flex items-center space-x-1">
                  <span className="material-symbols-outlined text-sm">error</span>
                  <span>{error}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!password.trim() || isLoading}
              className={`w-full px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${isLoading
                  ? 'bg-gray-500 text-white cursor-not-allowed'
                  : password.trim()
                    ? 'bg-primary-blue text-white hover:bg-primary-blue/90 hover:scale-105 shadow-lg'
                    : 'bg-ios-dark-separator/50 text-ios-dark-tertiary-label cursor-not-allowed'
                }`}
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">sync</span>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">login</span>
                  <span>Access Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-xs text-ios-dark-tertiary-label">
              Protected admin access for authorized users only
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
