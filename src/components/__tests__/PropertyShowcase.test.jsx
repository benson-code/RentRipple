import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PropertyShowcase from '../PropertyShowcase'
import * as propertyAPI from '../../utils/propertyAPI'

// Mock the propertyAPI module
vi.mock('../../utils/propertyAPI')

// Mock child components
vi.mock('../ImageCarousel', () => ({
  default: ({ images, title }) => (
    <div data-testid="image-carousel">
      Carousel: {title} ({images.length} images)
    </div>
  ),
}))

vi.mock('../PropertyDetails', () => ({
  default: ({ property, showOnlyMain, showOnlyDescription }) => (
    <div data-testid="property-details">
      {showOnlyMain && 'Main Details'}
      {showOnlyDescription && 'Description'}
      {property.title}
    </div>
  ),
}))

vi.mock('../ContactFooter', () => ({
  default: ({ price, currency }) => (
    <div data-testid="contact-footer">
      Footer: {currency}
      {price}
    </div>
  ),
}))

describe('PropertyShowcase', () => {
  const mockProperty = {
    title: 'Test Apartment',
    address: 'Bangkok',
    price: 13000,
    currency: '฿',
    priceUnit: 'month',
    images: [
      { id: '1', url: 'image1.jpg', name: 'Living Room' },
      { id: '2', url: 'image2.jpg', name: 'Bedroom' },
    ],
  }

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  it('shows loading state initially', () => {
    propertyAPI.getProperty.mockImplementation(() => new Promise(() => {})) // Never resolves

    renderWithRouter(<PropertyShowcase />)
    expect(screen.getByText('載入中...')).toBeInTheDocument()
  })

  it('loads and displays property data', async () => {
    propertyAPI.getProperty.mockResolvedValue(mockProperty)

    renderWithRouter(<PropertyShowcase />)

    await waitFor(() => {
      expect(screen.queryByText('載入中...')).not.toBeInTheDocument()
    })

    expect(screen.getByTestId('image-carousel')).toBeInTheDocument()
    expect(screen.getByTestId('contact-footer')).toBeInTheDocument()
  })

  it('calls getProperty with timestamp', async () => {
    propertyAPI.getProperty.mockResolvedValue(mockProperty)

    renderWithRouter(<PropertyShowcase />)

    await waitFor(() => {
      expect(propertyAPI.getProperty).toHaveBeenCalled()
    })

    const callArg = propertyAPI.getProperty.mock.calls[0][0]
    expect(callArg).toMatch(/\?t=\d+/)
  })

  it('falls back to localStorage on API error', async () => {
    const savedProperty = { ...mockProperty, title: 'Saved Property' }
    localStorage.setItem('rentRippleProperty', JSON.stringify(savedProperty))

    propertyAPI.getProperty.mockRejectedValue(new Error('API Error'))

    renderWithRouter(<PropertyShowcase />)

    await waitFor(() => {
      expect(screen.queryByText('載入中...')).not.toBeInTheDocument()
    })

    // Should use localStorage data
    expect(screen.getByText(/Saved Property/)).toBeInTheDocument()
  })

  it('renders ImageCarousel with property images', async () => {
    propertyAPI.getProperty.mockResolvedValue(mockProperty)

    renderWithRouter(<PropertyShowcase />)

    await waitFor(() => {
      const carousel = screen.getByTestId('image-carousel')
      expect(carousel).toHaveTextContent('2 images')
    })
  })

  it('renders ContactFooter with price information', async () => {
    propertyAPI.getProperty.mockResolvedValue(mockProperty)

    renderWithRouter(<PropertyShowcase />)

    await waitFor(() => {
      const footer = screen.getByTestId('contact-footer')
      expect(footer).toHaveTextContent('฿13000')
    })
  })

  it('handles missing localStorage gracefully', async () => {
    propertyAPI.getProperty.mockRejectedValue(new Error('API Error'))

    renderWithRouter(<PropertyShowcase />)

    await waitFor(() => {
      expect(screen.queryByText('載入中...')).not.toBeInTheDocument()
    })

    // Should not crash
    expect(screen.getByTestId('image-carousel')).toBeInTheDocument()
  })

  it('renders all required sections', async () => {
    propertyAPI.getProperty.mockResolvedValue(mockProperty)

    renderWithRouter(<PropertyShowcase />)

    await waitFor(() => {
      expect(screen.getByTestId('image-carousel')).toBeInTheDocument()
      expect(screen.getAllByTestId('property-details')).toHaveLength(2) // Main + Description
      expect(screen.getByTestId('contact-footer')).toBeInTheDocument()
    })
  })
})
