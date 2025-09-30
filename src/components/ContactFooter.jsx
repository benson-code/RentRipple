import React from 'react'
import { useNavigate } from 'react-router-dom'

const ContactFooter = ({ price, currency, priceUnit }) => {
  const navigate = useNavigate()

  const handleContactClick = () => {
    navigate('/qr')
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-glass border-t border-ios-dark-separator safe-area-bottom safe-area-left safe-area-right z-50" style={{position: 'fixed', bottom: 0, transform: 'translateZ(0)'}}>
      <div className="flex items-center px-4 py-2" style={{minHeight: '56px'}}>
        {/* 租金顯示區域 - 左側偏中 */}
        <div className="flex-shrink-0" style={{marginLeft: '16px'}}>
          <p className="text-base font-bold font-sf-pro-display text-ios-dark-label leading-tight">
            {currency}{price.toLocaleString()}
          </p>
          <p className="text-xs text-ios-dark-secondary-label opacity-65">
            per {priceUnit}
          </p>
        </div>

        {/* 彈性空間 */}
        <div className="flex-1"></div>

        {/* Rent 按鈕 - 居中偏右 */}
        <button
          onClick={handleContactClick}
          className="flex-shrink-0 px-5 py-2.5 bg-primary-blue text-white rounded-xl font-bold font-sf-pro-display text-base flex items-center justify-center shadow-lg active:bg-primary-blue/90 active:scale-95 transition-all duration-200 touch-target"
          style={{minWidth: '100px', height: '40px', marginRight: '20px'}}
        >
          Rent
        </button>
      </div>
    </footer>
  )
}

export default ContactFooter