import React, { useState } from 'react'

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // 安全的密碼驗證 - 必須設定環境變數
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

  // 檢查環境變數是否已設定
  const isPasswordConfigured = ADMIN_PASSWORD && ADMIN_PASSWORD.trim() !== ''

  const handleSubmit = (e) => {
    e.preventDefault()

    // 如果沒有設定密碼，禁止登入
    if (!isPasswordConfigured) {
      setError('系統尚未設定管理員密碼，請聯繫系統管理員')
      return
    }

    setIsLoading(true)
    setError('')

    // 模擬驗證延遲
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        // 成功登入，保存到 sessionStorage
        sessionStorage.setItem('adminAuthenticated', 'true')
        sessionStorage.setItem('loginTime', Date.now().toString())
        onLogin()
      } else {
        setError('密碼錯誤，請重新輸入')
        setPassword('')
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="h-full bg-ios-dark-background text-ios-dark-label overflow-hidden">
      <div className="h-full flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isPasswordConfigured ? 'bg-primary-blue' : 'bg-red-500/80'
              }`}
            >
              <span className="material-symbols-outlined text-white text-2xl">
                {isPasswordConfigured ? 'admin_panel_settings' : 'warning'}
              </span>
            </div>
            <h1 className="text-2xl font-bold font-sf-pro-display text-ios-dark-label mb-2">
              {isPasswordConfigured ? 'Admin Access' : 'Configuration Required'}
            </h1>
            <p className="text-ios-dark-secondary-label text-sm">
              {isPasswordConfigured
                ? 'Enter password to access admin panel'
                : 'Admin password has not been configured'}
            </p>
          </div>

          {/* Configuration Warning or Login Form */}
          {!isPasswordConfigured ? (
            /* Configuration Warning */
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <span className="material-symbols-outlined text-red-400 text-xl mt-0.5">
                    info
                  </span>
                  <div className="flex-1">
                    <h3 className="text-red-400 font-semibold text-sm mb-2">
                      Environment Variable Missing
                    </h3>
                    <p className="text-ios-dark-secondary-label text-xs leading-relaxed">
                      Please set{' '}
                      <code className="bg-ios-dark-secondary-background px-2 py-0.5 rounded text-primary-blue">
                        VITE_ADMIN_PASSWORD
                      </code>{' '}
                      in your environment variables or{' '}
                      <code className="bg-ios-dark-secondary-background px-2 py-0.5 rounded text-primary-blue">
                        .env.local
                      </code>{' '}
                      file.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-ios-dark-secondary-background/50 border border-ios-dark-separator rounded-xl p-4">
                <h4 className="text-ios-dark-label font-semibold text-sm mb-3 flex items-center space-x-2">
                  <span className="material-symbols-outlined text-lg">
                    integration_instructions
                  </span>
                  <span>Setup Instructions</span>
                </h4>
                <ol className="text-xs text-ios-dark-secondary-label space-y-2 ml-1">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-blue font-bold">1.</span>
                    <span>
                      Create a{' '}
                      <code className="bg-ios-dark-background px-1.5 py-0.5 rounded">
                        .env.local
                      </code>{' '}
                      file in the project root
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-blue font-bold">2.</span>
                    <span>
                      Add:{' '}
                      <code className="bg-ios-dark-background px-1.5 py-0.5 rounded">
                        VITE_ADMIN_PASSWORD=your-secure-password
                      </code>
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-blue font-bold">3.</span>
                    <span>Restart the development server</span>
                  </li>
                </ol>
              </div>
            </div>
          ) : (
            /* Login Form */
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
                className={`w-full px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isLoading
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
          )}

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-xs text-ios-dark-tertiary-label">
              {isPasswordConfigured
                ? 'Protected admin access for authorized users only'
                : 'For production deployment, set environment variables in Vercel Dashboard'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
