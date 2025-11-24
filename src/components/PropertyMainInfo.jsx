const PropertyMainInfo = ({ property }) => {
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
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold font-sf-pro-display text-ios-dark-label">
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

export default PropertyMainInfo
