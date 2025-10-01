import { put } from '@vercel/blob'

export default async function handler(req, res) {
  // 設定 CORS 標頭 - 限制來源
  const allowedOrigins = [
    'https://bangkokmrt.vercel.app',
    'https://rentripple-hfpzzodi4-ethan-alexander-warricks-projects.vercel.app',
    'https://rentripple-7wdzonhcj-ethan-alexander-warricks-projects.vercel.app',
    'http://localhost:3000', // 開發環境
    'http://localhost:5173', // Vite開發服務器
  ]

  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Max-Age', '86400') // 24小時預檢快取

  // 處理 OPTIONS 請求
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // 從請求體中獲取 base64 圖片數據
    const { imageData, imageName } = req.body

    // 輸入驗證
    if (!imageData || !imageName) {
      return res.status(400).json({ error: 'Missing imageData or imageName' })
    }

    // 驗證圖片名稱長度
    if (imageName.length > 100) {
      return res.status(400).json({ error: 'Image name too long (max 100 characters)' })
    }

    // 移除 data URL 前綴並驗證格式
    const dataUrlMatch = imageData.match(/^data:(image\/(jpeg|jpg|png|gif|webp));base64,(.+)$/)
    if (!dataUrlMatch) {
      return res
        .status(400)
        .json({ error: 'Invalid image format. Only JPEG, PNG, GIF, WebP allowed' })
    }

    const contentType = dataUrlMatch[1] // e.g., 'image/jpeg', 'image/png'
    const base64Data = dataUrlMatch[3]

    // 驗證 base64 數據
    if (!base64Data || base64Data.length === 0) {
      return res.status(400).json({ error: 'Empty image data' })
    }

    // 將 base64 轉換為 Buffer
    const buffer = Buffer.from(base64Data, 'base64')

    // 文件大小限制 (5MB)
    const maxSize = 5 * 1024 * 1024
    if (buffer.length > maxSize) {
      return res.status(400).json({ error: 'Image too large (max 5MB)' })
    }

    // 最小文件大小檢查 (避免空文件)
    if (buffer.length < 100) {
      return res.status(400).json({ error: 'Image file too small' })
    }

    // 生成安全的文件名
    const timestamp = Date.now()
    const extension = contentType.split('/')[1]
    const safeName = imageName
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/\.[^.]*$/, '')
      .substring(0, 50) // 限制長度
    const fileName = `${timestamp}-${safeName}.${extension}`

    // 上傳到 Vercel Blob
    const blob = await put(fileName, buffer, {
      access: 'public',
      contentType: contentType,
    })

    return res.status(200).json({
      success: true,
      url: blob.url,
      fileName: fileName,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return res.status(500).json({
      error: 'Upload failed',
      details: error.message,
    })
  }
}

// 設定 API 路由配置
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // 增加上傳限制
    },
  },
}
