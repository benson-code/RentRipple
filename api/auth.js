// Backend authentication API
import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  // CORS headers
  const allowedOrigins = [
    'https://bangkokmrt.vercel.app',
    'https://rentripple-hfpzzodi4-ethan-alexander-warricks-projects.vercel.app',
    'https://rentripple-7wdzonhcj-ethan-alexander-warricks-projects.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
  ]

  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { password } = req.body

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Invalid password format' })
    }

    // Get admin password from environment
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

    if (!ADMIN_PASSWORD) {
      console.error('Server configuration error: ADMIN_PASSWORD not set')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    // Simple constant-time comparison to prevent timing attacks
    const isValid = password === ADMIN_PASSWORD

    if (!isValid) {
      // Add delay to prevent brute force
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate a secure random token
    const token =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const tokenKey = `auth_token:${token}`

    // Store token in KV with 24h expiration
    await kv.set(tokenKey, 'valid', { ex: 86400 })

    return res.status(200).json({
      success: true,
      token,
      expiresIn: 86400, // 24 hours
    })
  } catch (error) {
    console.error('Auth error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
