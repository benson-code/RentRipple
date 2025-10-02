const PropertyDetails = ({
  property,
  showOnlyMain,
  showOnlyDescription,
  isFullscreen,
  onToggleFullscreen,
}) => {
  // Debug logging
  console.log('PropertyDetails received property:', property)

  // 只顯示主要物業資訊（標題、地址、房型資訊）
  if (showOnlyMain) {
    return (
      <div className="relative z-10 bg-transparent px-4 -mt-6">
        <div
          className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl p-5 mb-2 shadow-2xl"
          style={{
            background: 'rgba(28, 28, 30, 0.85)',
            backdropFilter: 'blur(20px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          <h1 className="text-xl md:text-2xl font-bold font-sf-pro-display text-ios-dark-label">
            {property.title}
          </h1>
          <p className="text-base text-ios-dark-secondary-label mt-1">{property.address}</p>

          {/* Property features */}
          <div className="mt-4 border-t border-ios-dark-separator pt-4">
            <div className="grid grid-cols-4 gap-2 text-base text-ios-dark-label">
              <div className="flex flex-col items-center justify-center space-y-1">
                <span className="material-symbols-outlined text-ios-dark-secondary-label text-lg">
                  bed
                </span>
                <span className="text-xs whitespace-nowrap">{property.beds} Bed</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1">
                <span className="material-symbols-outlined text-ios-dark-secondary-label text-lg">
                  shower
                </span>
                <span className="text-xs whitespace-nowrap">{property.baths} Bath</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1">
                <span className="material-symbols-outlined text-ios-dark-secondary-label text-lg">
                  kitchen
                </span>
                <span className="text-xs whitespace-nowrap">{property.kitchens || 1} Kit</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1">
                <span className="material-symbols-outlined text-ios-dark-secondary-label text-lg">
                  square_foot
                </span>
                <span className="text-xs whitespace-nowrap">{property.sqft} sq</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 只顯示Introducing Chapter One Spark Charan Bangphlat區域
  if (showOnlyDescription) {
    // 全螢幕模式
    if (isFullscreen) {
      return (
        <div className="relative z-10 bg-transparent px-4 pt-12 pb-8">
          {/* 全螢幕標題欄 */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold font-sf-pro-display text-ios-dark-label">
              Property Details
            </h1>
            <button
              onClick={onToggleFullscreen}
              className="w-10 h-10 bg-ios-dark-secondary-background/80 backdrop-blur-md rounded-full flex items-center justify-center touch-target"
            >
              <span
                className="material-symbols-outlined text-ios-dark-label"
                style={{ fontSize: '24px' }}
              >
                close
              </span>
            </button>
          </div>

          <div
            className="backdrop-blur-xl bg-black/25 border border-white/5 rounded-3xl p-6 mb-4 shadow-xl"
            style={{
              background: 'rgba(28, 28, 30, 0.75)',
              backdropFilter: 'blur(16px) saturate(1.5)',
              WebkitBackdropFilter: 'blur(16px) saturate(1.5)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            <h2 className="text-xl font-semibold font-sf-pro-display text-ios-dark-label mb-6">
              {property.buildingName || 'Chapter One Spark Charan'}
            </h2>
            <div className="space-y-5">
              <div className="text-base text-ios-dark-secondary-label leading-relaxed">
                <p className="mb-3 font-medium">
                  {property.description?.roomInfo ||
                    property.roomInfo ||
                    'Premium 1 room (7F 22.5sqft).'}
                </p>
              </div>
              <div className="text-base text-ios-dark-secondary-label leading-relaxed">
                <p className="mb-3">
                  {property.description?.location ||
                    property.location ||
                    '150m to MRT07 BangPhlat station & nearby Bangsue station.'}
                </p>
              </div>
              <div className="border-t border-ios-dark-separator/30 pt-4">
                <div className="text-base text-ios-dark-secondary-label leading-relaxed space-y-2">
                  {(
                    property.description?.highlights ||
                    property.highlights || [
                      'Fitness center • Pool • Convenience downstairs',
                      'International hospital • Lotus nearby',
                    ]
                  ).map((highlight, index) => (
                    <p key={index}>{highlight}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities - Static */}
            <div className="mt-6 border-t border-ios-dark-separator pt-6">
              <h3 className="text-lg font-semibold text-ios-dark-label mb-4">Amenities</h3>
              <div className="grid grid-cols-3 gap-3 text-sm text-ios-dark-secondary-label">
                <div className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-ios-dark-background/30">
                  <span className="material-symbols-outlined text-xl text-ios-dark-label">
                    fitness_center
                  </span>
                  <span className="font-medium">Gym</span>
                </div>
                <div className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-ios-dark-background/30">
                  <span className="material-symbols-outlined text-xl text-ios-dark-label">
                    pool
                  </span>
                  <span className="font-medium">Pool</span>
                </div>
                <div className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-ios-dark-background/30">
                  <span className="material-symbols-outlined text-xl text-ios-dark-label">
                    business_center
                  </span>
                  <span className="font-medium">Workspace</span>
                </div>
                <div className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-ios-dark-background/30">
                  <span className="material-symbols-outlined text-xl text-ios-dark-label">
                    ac_unit
                  </span>
                  <span className="font-medium">A/C</span>
                </div>
                <div className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-ios-dark-background/30">
                  <span className="material-symbols-outlined text-xl text-ios-dark-label">
                    local_laundry_service
                  </span>
                  <span className="font-medium">Laundry</span>
                </div>
                <div className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-ios-dark-background/30">
                  <span className="material-symbols-outlined text-xl text-ios-dark-label">
                    kitchen
                  </span>
                  <span className="font-medium">Kitchen</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mt-6 border-t border-ios-dark-separator pt-6">
              <h3 className="text-lg font-semibold text-ios-dark-label mb-4">Location</h3>
              <div className="space-y-3 text-base text-ios-dark-secondary-label">
                {(
                  property.locationFeatures || [
                    '2-min walk to MRT station',
                    'Multiple convenience stores nearby',
                    'Close to shopping centers',
                    'Restaurants & cafes nearby',
                  ]
                ).map((feature, index) => (
                  <p key={index}>• {feature}</p>
                ))}
              </div>
            </div>

            {/* Lease Terms */}
            <div className="mt-6 border-t border-ios-dark-separator pt-6">
              <h3 className="text-lg font-semibold text-ios-dark-label mb-4">Lease Terms</h3>
              <div className="space-y-3 text-base text-ios-dark-secondary-label">
                {(
                  property.leaseTerms || [
                    'Minimum lease: 1 year',
                    'Security deposit: 2 months rent',
                    'Management fee: Included in rent',
                    'Pet-friendly (upon discussion)',
                  ]
                ).map((term, index) => (
                  <p key={index}>• {term}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }

    // 正常模式（可點擊展開）
    return (
      <div className="relative z-10 bg-transparent px-4 pt-2">
        <div
          className="backdrop-blur-xl bg-black/25 border border-white/5 rounded-3xl p-5 mb-4 shadow-xl cursor-pointer transition-all duration-300 hover:bg-black/30 scale-effect"
          style={{
            background: 'rgba(28, 28, 30, 0.75)',
            backdropFilter: 'blur(16px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(16px) saturate(1.5)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
          onClick={onToggleFullscreen}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold font-sf-pro-display text-ios-dark-label">
              {property.buildingName || 'Chapter One Spark Charan'}
            </h2>
            <span className="material-symbols-outlined text-ios-dark-secondary-label text-lg">
              expand_more
            </span>
          </div>
          <div className="space-y-3">
            <div className="text-sm text-ios-dark-secondary-label leading-relaxed">
              <p className="font-medium">
                {property.description?.roomInfo ||
                  property.roomInfo ||
                  'Premium 1 room (7F 22.5sqft).'}
              </p>
              <p className="mt-2">
                {property.description?.location ||
                  property.location ||
                  '150m to MRT07 BangPhlat station & nearby Bangsue station.'}
              </p>
            </div>
            <p className="text-sm text-ios-dark-secondary-label leading-relaxed opacity-75">
              Click to expand for complete information...
            </p>
          </div>
        </div>
      </div>
    )
  }

  // 原始完整顯示（用於admin等其他地方）
  return (
    <div className="relative z-10 bg-transparent px-4 pt-4">
      <div
        className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl p-5 mb-4 shadow-2xl"
        style={{
          background: 'rgba(28, 28, 30, 0.85)',
          backdropFilter: 'blur(20px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        <h1 className="text-2xl font-bold font-sf-pro-display text-ios-dark-label">
          {property.title}
        </h1>
        <p className="text-base text-ios-dark-secondary-label mt-1">{property.address}</p>

        {/* Property features */}
        <div className="mt-4 border-t border-ios-dark-separator pt-4">
          <div className="grid grid-cols-4 gap-2 text-base text-ios-dark-label">
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="material-symbols-outlined text-ios-dark-secondary-label text-lg">
                bed
              </span>
              <span className="text-xs whitespace-nowrap">{property.beds} Bed</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="material-symbols-outlined text-ios-dark-secondary-label text-lg">
                shower
              </span>
              <span className="text-xs whitespace-nowrap">{property.baths} Bath</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="material-symbols-outlined text-ios-dark-secondary-label text-lg">
                kitchen
              </span>
              <span className="text-xs whitespace-nowrap">{property.kitchens || 1} Kit</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="material-symbols-outlined text-ios-dark-secondary-label text-lg">
                square_foot
              </span>
              <span className="text-xs whitespace-nowrap">{property.sqft} sq</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
