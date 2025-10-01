import { kv } from '@vercel/kv'
import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'

// Initialize DOMPurify for server-side
const window = new JSDOM('').window
const purify = DOMPurify(window)

// Sanitize function
function sanitizeInput(input) {
  if (typeof input === 'string') {
    return purify.sanitize(input, { ALLOWED_TAGS: [] })
  }
  if (Array.isArray(input)) {
    return input.map(sanitizeInput)
  }
  if (typeof input === 'object' && input !== null) {
    const sanitized = {}
    for (const key in input) {
      sanitized[key] = sanitizeInput(input[key])
    }
    return sanitized
  }
  return input
}

// 預設房屋數據
const defaultPropertyData = {
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

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Max-Age', '86400') // 24小時預檢快取

  // 設定緩存控制標頭 - 確保隱私模式下也能正常工作
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  // 添加時間戳標頭用於調試
  res.setHeader('X-Timestamp', Date.now().toString())

  // 處理 OPTIONS 請求
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    switch (req.method) {
      case 'GET': {
        // 獲取房屋數據
        let property = await kv.get('property')

        if (!property) {
          // 如果沒有數據，初始化預設數據
          await kv.set('property', defaultPropertyData)
          property = defaultPropertyData
        }

        return res.status(200).json(property)
      }

      case 'POST':
      case 'PUT': {
        // 更新房屋數據
        const updatedProperty = req.body

        // 驗證必要欄位
        if (!updatedProperty.title || !updatedProperty.price) {
          return res.status(400).json({
            error: 'Missing required fields: title and price are required',
          })
        }

        // Sanitize all input fields to prevent XSS
        const sanitizedProperty = sanitizeInput(updatedProperty)

        // Additional validation
        if (typeof sanitizedProperty.price !== 'number' || sanitizedProperty.price < 0) {
          return res.status(400).json({
            error: 'Invalid price value',
          })
        }

        // 儲存到 KV
        await kv.set('property', sanitizedProperty)

        return res.status(200).json({
          message: 'Property updated successfully',
          property: sanitizedProperty,
        })
      }

      case 'DELETE':
        // 重置為預設數據
        await kv.set('property', defaultPropertyData)

        return res.status(200).json({
          message: 'Property reset to default',
          property: defaultPropertyData,
        })

      default:
        return res.status(405).json({ error: `Method ${req.method} not allowed` })
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    })
  }
}
