import { useState, useEffect } from 'react'
import { propertyData } from '../data/propertyData'
import { getProperty } from '../utils/propertyAPI'
import ImageCarousel from './ImageCarousel'
import PropertyMainInfo from './PropertyMainInfo'
import PropertyDescriptionCard from './PropertyDescriptionCard'
import PropertyDescriptionFullscreen from './PropertyDescriptionFullscreen'
import ContactFooter from './ContactFooter'

const PropertyShowcase = () => {
  const [property, setProperty] = useState(propertyData)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setIsLoading(true)
        setError(null)
        // 添加時間戳避免緩存問題
        const timestamp = Date.now()
        const propertyData = await getProperty(`?t=${timestamp}`)
        setProperty(propertyData)
      } catch (err) {
        console.error('Error loading property:', err)
        // API 失敗時不顯示錯誤頁面，而是使用預設數據
        // setError('無法載入房產資訊。請檢查您的網路連線並稍後再試。')
      } finally {
        setIsLoading(false)
      }
    }

    loadProperty()
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // 錯誤狀態
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-ios-dark-background">
        <div className="text-center text-red-400 px-4">
          <span className="material-symbols-outlined text-5xl mb-4">error</span>
          <h1 className="text-xl font-bold mb-2">發生錯誤</h1>
          <p className="text-ios-dark-secondary-label">{error}</p>
        </div>
      </div>
    )
  }

  // 載入狀態
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-ios-dark-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-ios-dark-secondary-label">載入中...</p>
        </div>
      </div>
    )
  }

  // 全螢幕模式
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-ios-dark-background fullscreen-enter">
        {/* 全螢幕物業介紹 */}
        <div className="h-full overflow-y-auto ios-scroll">
          <PropertyDescriptionFullscreen
            property={property}
            onToggleFullscreen={toggleFullscreen}
          />
        </div>
      </div>
    )
  }

  // 正常模式
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* 固定圖片區域 */}
      <div className="flex-shrink-0">
        <ImageCarousel images={property.images} title={property.title} />
      </div>

      {/* 固定的主要物業資訊區域 */}
      <div className="flex-shrink-0">
        <PropertyMainInfo property={property} />
      </div>

      {/* 固定的物業介紹區域 */}
      <div className="flex-shrink-0">
        <PropertyDescriptionCard
          property={property}
          onToggleFullscreen={toggleFullscreen}
        />
      </div>

      {/* 底部空白區域保持整體布局 */}
      <div className="flex-1"></div>

      <ContactFooter
        price={property.price}
        currency={property.currency}
        priceUnit={property.priceUnit}
      />
    </div>
  )
}

export default PropertyShowcase
