const PropertyDescriptionFullscreen = ({ property, onToggleFullscreen }) => {
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
              {property.description?.roomInfo || property.roomInfo}
            </p>
          </div>
          <div className="text-base text-ios-dark-secondary-label leading-relaxed">
            <p className="mb-3">{property.description?.location || property.location}</p>
          </div>
          <div className="border-t border-ios-dark-separator/30 pt-4">
            <div className="text-base text-ios-dark-secondary-label leading-relaxed space-y-2">
              {property.description?.highlights?.map((highlight, index) => (
                <p key={index}>{highlight}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Amenities - Dynamic */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="mt-6 border-t border-ios-dark-separator pt-6">
            <h3 className="text-lg font-semibold text-ios-dark-label mb-4">Amenities</h3>
            <div className="grid grid-cols-3 gap-3 text-sm text-ios-dark-secondary-label">
              {property.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-ios-dark-background/30"
                >
                  <span className="material-symbols-outlined text-xl text-ios-dark-label">
                    {amenity.icon || 'help'}
                  </span>
                  <span className="font-medium">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location */}
        {property.locationFeatures && property.locationFeatures.length > 0 && (
          <div className="mt-6 border-t border-ios-dark-separator pt-6">
            <h3 className="text-lg font-semibold text-ios-dark-label mb-4">Location</h3>
            <div className="space-y-3 text-base text-ios-dark-secondary-label">
              {property.locationFeatures.map((feature, index) => (
                <p key={index}>• {feature}</p>
              ))}
            </div>
          </div>
        )}

        {/* Lease Terms */}
        {property.leaseTerms && property.leaseTerms.length > 0 && (
          <div className="mt-6 border-t border-ios-dark-separator pt-6">
            <h3 className="text-lg font-semibold text-ios-dark-label mb-4">Lease Terms</h3>
            <div className="space-y-3 text-base text-ios-dark-secondary-label">
              {property.leaseTerms.map((term, index) => (
                <p key={index}>• {term}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyDescriptionFullscreen
