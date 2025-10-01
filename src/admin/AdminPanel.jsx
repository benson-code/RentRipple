import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProperty, updateProperty, uploadImage } from '../utils/propertyAPI'
import AdminLogin from '../components/AdminLogin'

const AdminPanel = () => {
  const [property, setProperty] = useState({
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
    images: [],
  })

  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = sessionStorage.getItem('adminAuthenticated')
      const loginTime = sessionStorage.getItem('loginTime')

      // 檢查是否已登入且未超過24小時
      if (authenticated === 'true' && loginTime) {
        const now = Date.now()
        const loginTimestamp = parseInt(loginTime)
        const twentyFourHours = 24 * 60 * 60 * 1000 // 24小時

        if (now - loginTimestamp < twentyFourHours) {
          setIsAuthenticated(true)
        } else {
          // 登入已過期，清除認證
          sessionStorage.removeItem('adminAuthenticated')
          sessionStorage.removeItem('loginTime')
          setIsAuthenticated(false)
        }
      }
    }

    checkAuth()
  }, [])

  // Load property data from KV database on component mount
  useEffect(() => {
    const loadProperty = async () => {
      try {
        setIsLoading(true)
        const propertyData = await getProperty()
        setProperty(propertyData)
      } catch (error) {
        console.error('Error loading property:', error)
        // 使用預設數據作為後備
      } finally {
        setIsLoading(false)
      }
    }

    if (isAuthenticated) {
      loadProperty()
    }
  }, [isAuthenticated])

  const saveProperty = async () => {
    try {
      setIsSaving(true)
      await updateProperty(property)
      // 也保存到 localStorage 作為備份
      localStorage.setItem('rentRippleProperty', JSON.stringify(property))
      setHasUnsavedChanges(false)
      setLastSaved(new Date())
      alert('Saved successfully!')
    } catch (error) {
      console.error('Error saving property:', error)
      alert('Save failed, please try again later')
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field, value) => {
    const updatedProperty = { ...property, [field]: value }
    setProperty(updatedProperty)
    setHasUnsavedChanges(true)
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated')
    sessionStorage.removeItem('loginTime')
    setIsAuthenticated(false)
    setHasUnsavedChanges(false)
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsUploading(true)

    try {
      // Create a FileReader to convert image to base64 for upload
      const reader = new FileReader()
      reader.onload = async (e) => {
        const imageData = e.target.result
        const roomName = prompt('Enter room name (e.g., Living Room, Bedroom, Kitchen):')

        if (roomName) {
          try {
            // 上傳圖片到 Vercel Blob
            const uploadResult = await uploadImage(imageData, `${roomName}_${file.name}`)

            const newImage = {
              id: roomName.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now(),
              name: roomName,
              url: uploadResult.url, // 使用上傳後的真實 URL
            }

            const updatedProperty = {
              ...property,
              images: [...property.images, newImage],
            }
            setProperty(updatedProperty)
            setHasUnsavedChanges(true)
          } catch (uploadError) {
            console.error('Upload failed:', uploadError)
            alert('圖片上傳失敗，請稍後再試')
          }
        }
        setIsUploading(false)
      }

      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error handling image upload:', error)
      alert('處理圖片時出錯，請稍後再試')
      setIsUploading(false)
    }
  }

  const removeImage = (imageId) => {
    const updatedProperty = {
      ...property,
      images: property.images.filter((img) => img.id !== imageId),
    }
    setProperty(updatedProperty)
    setHasUnsavedChanges(true)
  }

  const reorderImages = (fromIndex, toIndex) => {
    const updatedImages = [...property.images]
    const [movedImage] = updatedImages.splice(fromIndex, 1)
    updatedImages.splice(toIndex, 0, movedImage)

    const updatedProperty = { ...property, images: updatedImages }
    setProperty(updatedProperty)
    setHasUnsavedChanges(true)
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="h-full bg-ios-dark-background text-ios-dark-label overflow-y-auto admin-scrollbar">
      <div className="px-4 py-4 pb-8">
        {/* Header */}
        <div className="flex flex-col space-y-4 mb-8">
          {/* Top Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <Link
              to="/"
              className="flex items-center space-x-3 text-primary-blue hover:text-primary-blue/80 transition-colors group"
            >
              <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span className="text-base font-medium">Back to Property</span>
            </Link>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold font-sf-pro-display text-ios-dark-label">
                Admin Panel
              </h1>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Logout"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-ios-dark-secondary-background/50 rounded-xl px-4 py-4 backdrop-blur-sm space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {lastSaved && (
                <div className="flex items-center space-x-2 text-ios-dark-secondary-label">
                  <span className="material-symbols-outlined text-green-500 text-lg">
                    check_circle
                  </span>
                  <span className="text-sm">
                    Last saved: {lastSaved.toLocaleTimeString('en-US', { hour12: false })}
                  </span>
                </div>
              )}
              {hasUnsavedChanges && (
                <div className="flex items-center space-x-2 text-orange-400">
                  <span className="material-symbols-outlined text-lg animate-pulse">edit</span>
                  <span className="text-sm font-medium">Unsaved changes</span>
                </div>
              )}
            </div>

            <button
              onClick={saveProperty}
              disabled={isSaving || !hasUnsavedChanges}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                isSaving
                  ? 'bg-gray-500 text-white cursor-not-allowed'
                  : hasUnsavedChanges
                    ? 'bg-primary-blue text-white hover:bg-primary-blue/90 hover:scale-105 shadow-lg'
                    : 'bg-ios-dark-separator/50 text-ios-dark-tertiary-label cursor-not-allowed'
              }`}
            >
              {isSaving ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">sync</span>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">save</span>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Property Details Form */}
        <div className="bg-ios-dark-secondary-background/80 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-ios-dark-separator/30 shadow-xl">
          <div className="flex items-center space-x-3 mb-6">
            <span className="material-symbols-outlined text-primary-blue text-2xl">home</span>
            <h2 className="text-xl font-bold font-sf-pro-display text-ios-dark-label">
              Property Details
            </h2>
          </div>

          <div className="grid gap-6">
            {/* Basic Information Group */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-ios-dark-label border-b border-ios-dark-separator/30 pb-2">
                Basic Information
              </h3>
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-ios-dark-secondary-label mb-3">
                  <span className="material-symbols-outlined text-lg">title</span>
                  <span>Property Title</span>
                </label>
                <input
                  type="text"
                  value={property.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full bg-ios-dark-background/70 text-ios-dark-label border border-ios-dark-separator hover:border-primary-blue/50 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 rounded-xl px-4 py-3 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-ios-dark-secondary-label mb-3">
                  <span className="material-symbols-outlined text-lg">location_on</span>
                  <span>Address</span>
                </label>
                <input
                  type="text"
                  value={property.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full bg-ios-dark-background/70 text-ios-dark-label border border-ios-dark-separator hover:border-primary-blue/50 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 rounded-xl px-4 py-3 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-ios-dark-secondary-label mb-3">
                  <span className="material-symbols-outlined text-lg">qr_code</span>
                  <span>QR Code URL</span>
                </label>
                <input
                  type="url"
                  value={property.qrCodeUrl}
                  onChange={(e) => handleInputChange('qrCodeUrl', e.target.value)}
                  placeholder="https://qr-official.line.me/gs/..."
                  className="w-full bg-ios-dark-background/70 text-ios-dark-label border border-ios-dark-separator hover:border-primary-blue/50 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 rounded-xl px-4 py-3 transition-all"
                />
                <p className="text-xs text-ios-dark-tertiary-label mt-2 flex items-center space-x-1">
                  <span className="material-symbols-outlined text-sm">info</span>
                  <span>Enter the LINE QR code URL for contact page</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ios-dark-secondary-label mb-2">
                  Price
                </label>
                <input
                  type="number"
                  value={property.price}
                  onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                  className="w-full bg-ios-dark-background text-ios-dark-label border border-ios-dark-separator rounded-xl px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ios-dark-secondary-label mb-2">
                  Price Unit
                </label>
                <select
                  value={property.priceUnit}
                  onChange={(e) => handleInputChange('priceUnit', e.target.value)}
                  className="w-full bg-ios-dark-background text-ios-dark-label border border-ios-dark-separator rounded-xl px-3 py-2"
                >
                  <option value="month">month</option>
                  <option value="week">week</option>
                  <option value="day">day</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-ios-dark-secondary-label mb-2">
                  Beds
                </label>
                <input
                  type="number"
                  value={property.beds}
                  onChange={(e) => handleInputChange('beds', parseInt(e.target.value))}
                  className="w-full bg-ios-dark-background text-ios-dark-label border border-ios-dark-separator rounded-xl px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ios-dark-secondary-label mb-2">
                  Baths
                </label>
                <input
                  type="number"
                  value={property.baths}
                  onChange={(e) => handleInputChange('baths', parseInt(e.target.value))}
                  className="w-full bg-ios-dark-background text-ios-dark-label border border-ios-dark-separator rounded-xl px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ios-dark-secondary-label mb-2">
                  Kitchens
                </label>
                <input
                  type="number"
                  value={property.kitchens}
                  onChange={(e) => handleInputChange('kitchens', parseInt(e.target.value))}
                  className="w-full bg-ios-dark-background text-ios-dark-label border border-ios-dark-separator rounded-xl px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ios-dark-secondary-label mb-2">
                  Square Feet
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={property.sqft}
                  onChange={(e) => handleInputChange('sqft', parseFloat(e.target.value))}
                  className="w-full bg-ios-dark-background text-ios-dark-label border border-ios-dark-separator rounded-xl px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Management */}
        <div className="bg-ios-dark-secondary-background/80 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-ios-dark-separator/30 shadow-xl">
          <div className="flex items-center space-x-3 mb-6">
            <span className="material-symbols-outlined text-primary-blue text-2xl">
              description
            </span>
            <h2 className="text-xl font-bold font-sf-pro-display text-ios-dark-label">
              Property Content
            </h2>
          </div>

          <div className="grid gap-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-ios-dark-secondary-label mb-3">
                <span className="material-symbols-outlined text-lg">business</span>
                <span>Building Name</span>
              </label>
              <input
                type="text"
                value={property.buildingName}
                onChange={(e) => handleInputChange('buildingName', e.target.value)}
                className="w-full bg-ios-dark-background/70 text-ios-dark-label border border-ios-dark-separator hover:border-primary-blue/50 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 rounded-xl px-4 py-3 transition-all"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-ios-dark-secondary-label mb-3">
                <span className="material-symbols-outlined text-lg">edit_note</span>
                <span>Property Description</span>
              </label>
              <textarea
                value={`${property.description?.roomInfo || ''}${property.description?.roomInfo && property.description?.location ? '\n\n' : ''}${property.description?.location || ''}`}
                onChange={(e) => {
                  const lines = e.target.value.split('\n\n')
                  const roomInfo = lines[0] || ''
                  const location = lines[1] || ''
                  handleInputChange('description', {
                    ...property.description,
                    roomInfo: roomInfo,
                    location: location,
                  })
                }}
                placeholder="Enter room information, separate location description with two empty lines&#10;&#10;Example:&#10;Premium 1 room (7F 22.5sqft).&#10;&#10;150m to MRT07 BangPhlat station & nearby Bangsue station."
                className="w-full bg-ios-dark-background/70 text-ios-dark-label border border-ios-dark-separator hover:border-primary-blue/50 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 rounded-xl px-4 py-4 h-36 transition-all resize-y"
              />
              <p className="text-xs text-ios-dark-tertiary-label mt-2 flex items-center space-x-1">
                <span className="material-symbols-outlined text-sm">info</span>
                <span>Separate room information and location description with two empty lines</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-ios-dark-secondary-label mb-2">
                Highlights (One per line)
              </label>
              <textarea
                value={property.description?.highlights?.join('\n') || ''}
                onChange={(e) => {
                  const highlights = e.target.value.split('\n').filter((line) => line.trim())
                  handleInputChange('description', { ...property.description, highlights })
                }}
                className="w-full bg-ios-dark-background text-ios-dark-label border border-ios-dark-separator rounded-xl px-3 py-2 h-20"
                placeholder="Fitness center • Pool • Convenience downstairs&#10;International hospital • Lotus nearby"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ios-dark-secondary-label mb-2">
                Location Features (One per line)
              </label>
              <textarea
                value={property.locationFeatures?.join('\n') || ''}
                onChange={(e) => {
                  const features = e.target.value.split('\n').filter((line) => line.trim())
                  handleInputChange('locationFeatures', features)
                }}
                className="w-full bg-ios-dark-background text-ios-dark-label border border-ios-dark-separator rounded-xl px-3 py-2 h-24"
                placeholder="2-min walk to MRT station&#10;Multiple convenience stores nearby&#10;Close to shopping centers"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ios-dark-secondary-label mb-2">
                Lease Terms (One per line)
              </label>
              <textarea
                value={property.leaseTerms?.join('\n') || ''}
                onChange={(e) => {
                  const terms = e.target.value.split('\n').filter((line) => line.trim())
                  handleInputChange('leaseTerms', terms)
                }}
                className="w-full bg-ios-dark-background text-ios-dark-label border border-ios-dark-separator rounded-xl px-3 py-2 h-24"
                placeholder="Minimum lease: 1 year&#10;Security deposit: 2 months rent&#10;Management fee: Included in rent"
              />
            </div>
          </div>
        </div>

        {/* Image Management */}
        <div className="bg-ios-dark-secondary-background rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Property Images</h2>
            <label className="cursor-pointer bg-primary-blue text-white px-4 py-2 rounded-xl text-sm font-medium">
              {isUploading ? 'Uploading...' : 'Add Image'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>

          <div className="space-y-3">
            {property.images.map((image, index) => (
              <div
                key={image.id}
                className="flex items-center space-x-3 bg-ios-dark-background rounded-xl p-3"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium">{image.name}</p>
                  <p className="text-sm text-ios-dark-secondary-label">Position: {index + 1}</p>
                </div>
                <div className="flex space-x-2">
                  {index > 0 && (
                    <button
                      onClick={() => reorderImages(index, index - 1)}
                      className="w-8 h-8 bg-ios-dark-separator rounded-lg flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
                    </button>
                  )}
                  {index < property.images.length - 1 && (
                    <button
                      onClick={() => reorderImages(index, index + 1)}
                      className="w-8 h-8 bg-ios-dark-separator rounded-lg flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                    </button>
                  )}
                  <button
                    onClick={() => removeImage(image.id)}
                    className="w-8 h-8 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}

            {property.images.length === 0 && (
              <div className="text-center py-8 text-ios-dark-secondary-label">
                <span className="material-symbols-outlined text-4xl mb-2 block">image</span>
                <p>No images uploaded yet</p>
                <p className="text-sm">Add your first property image above</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
