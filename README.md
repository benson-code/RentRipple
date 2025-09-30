# RentRipple - Premium Property Showcase

A high-quality, mobile-first React application for showcasing rental properties with an admin panel for easy content management.

## Features

- **Mobile-First Design**: Optimized for iPhone and mobile devices with iOS-style UI
- **Image Carousel**: Smooth swipe navigation through property photos
- **Admin Panel**: Easy-to-use backend for updating property details and managing images
- **Responsive Design**: Works perfectly on all screen sizes
- **Local Storage**: Property data persists locally for demo purposes
- **Touch Optimized**: Large touch targets and smooth interactions

## Tech Stack

- **React 18** with Hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Vite** for fast development and building
- **Local Storage** for data persistence

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

### Viewing the Property

- Navigate to `/` to see the main property showcase
- Swipe through property images or use the navigation dots
- Tap room buttons to jump to specific images
- Contact button opens phone dialer (you can customize this)

### Admin Panel

- Navigate to `/admin` to access the management interface
- Update property details (title, address, price, beds, baths, sqft)
- Upload new images by clicking "Add Image"
- Reorder images using the arrow buttons
- Remove images with the delete button
- All changes are automatically saved to local storage

### Image Management

- Supported formats: JPG, PNG, GIF, WebP
- Images are converted to base64 for local storage
- Room names are automatically converted to IDs
- Images can be reordered for optimal display

## Customization

### Styling

The app uses Tailwind CSS with custom iOS-style colors and components. Key color variables are defined in `tailwind.config.js`:

- `primary-blue`: Main accent color
- `ios-dark-background`: Main dark background
- `ios-dark-secondary-background`: Card backgrounds
- `ios-dark-label`: Primary text color

### Contact Functionality

Currently, the "Contact Me" button opens the phone dialer. You can customize this in `src/components/ContactFooter.jsx`:

```jsx
const handleContactClick = () => {
  // Options:
  // Phone: window.location.href = 'tel:+1234567890'
  // Email: window.location.href = 'mailto:contact@example.com'
  // WhatsApp: window.location.href = 'https://wa.me/1234567890'
  // Custom form: navigate to contact form page
}
```

## Project Structure

```
src/
├── components/           # React components
│   ├── PropertyShowcase.jsx
│   ├── ImageCarousel.jsx
│   ├── PropertyDetails.jsx
│   └── ContactFooter.jsx
├── admin/               # Admin panel
│   └── AdminPanel.jsx
├── data/                # Default property data
│   └── propertyData.js
├── App.jsx              # Main app component
├── main.jsx             # React entry point
└── index.css            # Global styles
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Mobile Optimization

- Safe area insets for iPhone notch and home indicator
- Touch-friendly button sizes (minimum 44px)
- Smooth scrolling with momentum
- Optimized image loading and caching
- iOS-style blur effects and animations

## Browser Support

- Safari (iOS)
- Chrome (Android & Desktop)
- Firefox
- Edge

## License

This project is open source and available under the MIT License.