import { Routes, Route } from 'react-router-dom'
import PropertyShowcase from './components/PropertyShowcase'
import AdminPanel from './admin/AdminPanel'
import QRCodePage from './components/QRCodePage'

function App() {
  return (
    <div className="min-h-screen lg:bg-gradient-to-br lg:from-gray-900 lg:to-gray-800 lg:flex lg:items-center lg:justify-center lg:p-4 bg-ios-dark-background">
      {/* iPhone container for desktop viewing */}
      <div className="iphone-container">
        {/* iPhone notch */}
        <div className="iphone-notch"></div>

        {/* App content */}
        <div className="w-full h-full bg-ios-dark-background relative overflow-hidden">
          <Routes>
            <Route path="/" element={<PropertyShowcase />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/qr" element={<QRCodePage />} />
          </Routes>
        </div>

        {/* iPhone home indicator */}
        <div className="iphone-home-indicator"></div>
      </div>
    </div>
  )
}

export default App
