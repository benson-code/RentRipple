import React, { useState, useEffect, useRef } from 'react'

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)
  const scrollTimeout = useRef(null)

  const scrollToImage = (index) => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth',
      })
    }
  }

  const handleScroll = () => {
    if (carouselRef.current) {
      // 清除之前的超時
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      // 防抖動處理 - 減少延遲提升響應性
      scrollTimeout.current = setTimeout(() => {
        if (carouselRef.current) {
          const scrollLeft = carouselRef.current.scrollLeft
          const itemWidth = carouselRef.current.offsetWidth

          // 改善計算邏輯 - 加入容錯範圍
          const rawIndex = scrollLeft / itemWidth
          const activeIndex = Math.round(rawIndex)

          // 只在索引真正改變時才更新狀態，並確保索引有效
          if (activeIndex !== currentIndex && activeIndex >= 0 && activeIndex < images.length) {
            setCurrentIndex(activeIndex)
          }
        }
      }, 25) // 減少到 25ms 提升響應性
    }
  }

  const handleRoomClick = (roomId) => {
    const index = images.findIndex((img) => img.id === roomId)
    if (index !== -1) {
      setCurrentIndex(index)
      scrollToImage(index)
    }
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll)

      // Listen for room navigation from PropertyDetails
      const handleRoomNavigation = (event) => {
        handleRoomClick(event.detail)
      }

      window.addEventListener('scrollToRoom', handleRoomNavigation)

      return () => {
        carousel.removeEventListener('scroll', handleScroll)
        window.removeEventListener('scrollToRoom', handleRoomNavigation)

        // 清理超時
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current)
        }
      }
    }
  }, [images, currentIndex]) // 添加 currentIndex 依賴項解決閉包問題

  return (
    <div className="relative w-full h-[45vh] overflow-hidden">
      <div
        ref={carouselRef}
        className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory no-scrollbar smooth-scroll"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className="flex-shrink-0 w-full h-full bg-cover bg-center snap-center"
            style={{ backgroundImage: `url("${image.url}")` }}
            role="img"
            aria-label={image.name || `Property image ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center space-x-1.5">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => {
              setCurrentIndex(index)
              scrollToImage(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel
