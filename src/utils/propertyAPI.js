// API 基礎網址
const API_BASE = typeof window !== 'undefined' ? '' : 'https://bangkokmrt.vercel.app'

// 獲取房屋數據
export const getProperty = async (queryParams = '') => {
  try {
    // 如果沒有提供查詢參數，添加時間戳避免緩存問題
    const urlParams = queryParams || `?t=${Date.now()}`
    const response = await fetch(`${API_BASE}/api/property${urlParams}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching property:', error)
    // 如果 API 失敗，返回預設數據
    return {
      title: 'Cozy MRT Apartment',
      address: 'Bang Ao, Bang Phlat, Bangkok 10700',
      price: 13000,
      currency: '฿',
      priceUnit: 'month',
      beds: 1,
      baths: 1,
      kitchens: 1,
      sqft: 22.5,
      qrCodeUrl: 'https://qr-official.line.me/gs/M_220xvrzg_BW.png?oat_content=qr',
      buildingName: 'Chapter One Spark Charan',
      description: {
        roomInfo: 'Premium 1 room (7F 22.5sqft).',
        location: '150m to MRT07 BangPhlat station & nearby Bangsue station.',
        highlights: [
          'Fitness center • Pool • Convenience downstairs',
          'International hospital • Lotus nearby',
        ],
      },
      amenities: [
        { icon: 'fitness_center', name: 'Gym' },
        { icon: 'pool', name: 'Pool' },
        { icon: 'business_center', name: 'Workspace' },
        { icon: 'ac_unit', name: 'A/C' },
        { icon: 'local_laundry_service', name: 'Laundry' },
        { icon: 'kitchen', name: 'Kitchen' },
      ],
      locationFeatures: [
        '2-min walk to MRT station',
        'Multiple convenience stores nearby',
        'Close to shopping centers',
        'Restaurants & cafes nearby',
      ],
      leaseTerms: [
        'Minimum lease: 1 year',
        'Security deposit: 2 months rent',
        'Management fee: Included in rent',
        'Pet-friendly (upon discussion)',
      ],
      images: [
        {
          id: 'living_room',
          name: 'Living Room',
          url: 'https://bangkokmrt.vercel.app/og-image.jpg',
        },
      ],
    }
  }
}

// 更新房屋數據
export const updateProperty = async (propertyData) => {
  try {
    const response = await fetch(`${API_BASE}/api/property`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error updating property:', error)
    throw error
  }
}

// 重置房屋數據
export const resetProperty = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/property`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error resetting property:', error)
    throw error
  }
}

// 上傳圖片
export const uploadImage = async (imageData, imageName) => {
  try {
    const response = await fetch(`${API_BASE}/api/upload-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageData,
        imageName,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}
