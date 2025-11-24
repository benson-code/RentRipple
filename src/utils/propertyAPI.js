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
    // 讓錯誤向上傳播，由調用者處理
    throw error
  }
}

// 更新房屋數據
export const updateProperty = async (propertyData, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE}/api/property`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(propertyData),
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized')
      }
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
export const resetProperty = async (token) => {
  try {
    const headers = {}

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE}/api/property`, {
      method: 'DELETE',
      headers: headers,
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized')
      }
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
export const uploadImage = async (imageData, imageName, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE}/api/upload-image`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        imageData,
        imageName,
      }),
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}
