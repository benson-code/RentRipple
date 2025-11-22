const PropertyDescriptionCard = ({ property, onToggleFullscreen }) => {
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
  );
};

export default PropertyDescriptionCard;
