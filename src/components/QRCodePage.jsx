import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCode from 'qrcode'
import { getProperty } from '../utils/propertyAPI'

const QRCodePage = () => {
  const navigate = useNavigate()
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [useOfficialQR, setUseOfficialQR] = useState(true)

  const handleBackClick = () => {
    navigate('/')
  }

  // Generate fallback QR code
  const generateFallbackQRCode = async () => {
    try {
      const lineUrl = 'https://lin.ee/2pgJUhA'
      const qrDataURL = await QRCode.toDataURL(lineUrl, {
        errorCorrectionLevel: 'M',
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      })
      setQrCodeUrl(qrDataURL)
      setUseOfficialQR(false)
    } catch (error) {
      console.error('Failed to generate QR code:', error)
    }
  }

  // Handle official QR code load error
  const handleQRError = (e) => {
    if (import.meta.env.DEV) {
      console.log('Official QR code failed to load, generating fallback...')
      console.log('Error details:', e)
      console.log('Failed URL:', e.target.src)
    }
    generateFallbackQRCode()
  }

  useEffect(() => {
    // Load QR Code URL from property data
    const loadQRCode = async () => {
      try {
        if (import.meta.env.DEV) {
          console.log('Loading property data for QR code...')
        }
        const property = await getProperty()
        const dynamicQrUrl = property.qrCodeUrl

        if (dynamicQrUrl) {
          if (import.meta.env.DEV) {
            console.log('Using dynamic QR URL:', dynamicQrUrl)
          }
          setQrCodeUrl(dynamicQrUrl)
          setUseOfficialQR(true)
        } else {
          // Fallback to local image
          if (import.meta.env.DEV) {
            console.log('No dynamic QR URL, trying local image')
          }
          const localUrl = '/line-qr.png'
          const img = new Image()

          img.onload = () => {
            if (import.meta.env.DEV) {
              console.log('Using local LINE QR code')
            }
            setQrCodeUrl(localUrl)
            setUseOfficialQR(true)
          }

          img.onerror = () => {
            if (import.meta.env.DEV) {
              console.log('Local QR not found, generating fallback')
            }
            generateFallbackQRCode()
          }

          img.src = localUrl
        }
      } catch (error) {
        console.error('Error loading QR code:', error)
        // Final fallback to generated QR
        generateFallbackQRCode()
      }
    }

    loadQRCode()
  }, [])

  return (
    <div className="min-h-screen bg-ios-dark-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-glass border-b border-ios-dark-separator">
        <button
          onClick={handleBackClick}
          className="text-primary-blue text-base font-sf-pro-display"
        >
          ← Back
        </button>
        <h1 className="text-base font-semibold text-ios-dark-label">Contact</h1>
        <div className="w-12"></div> {/* Spacer for centering */}
      </div>

      {/* QR Code Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-ios-dark-label mb-2">Scan to Contact</h2>
          <p className="text-ios-dark-secondary-label text-base">
            Scan the QR code below to get in touch with us
          </p>
        </div>

        {/* QR Code Container */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          {qrCodeUrl ? (
            <img
              src={qrCodeUrl}
              alt="Contact QR Code"
              className="w-64 h-64 mx-auto"
              onError={handleQRError}
              onLoad={(e) => {
                if (import.meta.env.DEV) {
                  console.log('QR code loaded successfully')
                  console.log('Loaded URL:', e.target.src)
                  console.log('Using official QR:', useOfficialQR)
                }
              }}
            />
          ) : (
            <div className="w-64 h-64 mx-auto bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
                <p className="text-sm">Loading QR Code...</p>
              </div>
            </div>
          )}
        </div>

        {/* QR Code Source Info */}
        <div className="text-center mt-2">
          <p className="text-xs text-ios-dark-tertiary-label">
            {useOfficialQR ? 'Official LINE QR Code' : 'Generated QR Code'}
          </p>
        </div>

        <div className="text-center mt-6">
          <p className="text-ios-dark-secondary-label text-sm mb-4">
            Add us on LINE to start your rental inquiry
          </p>

          {/* Direct Add Friend Button */}
          <button
            onClick={() => window.open('https://lin.ee/2pgJUhA', '_blank')}
            className="bg-[#00B900] text-white px-6 py-3 rounded-xl font-semibold text-base flex items-center justify-center mx-auto shadow-lg active:scale-95 transition-all duration-200"
          >
            <span className="mr-2">📱</span>
            Add Friend on LINE
          </button>
        </div>
      </div>
    </div>
  )
}

export default QRCodePage
