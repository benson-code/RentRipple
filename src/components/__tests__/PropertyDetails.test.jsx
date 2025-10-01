import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import PropertyDetails from '../PropertyDetails'

describe('PropertyDetails', () => {
  const mockProperty = {
    title: 'Bangkok MRT Apartment',
    address: 'Bang Ao, Bang Phlat, Bangkok 10700',
    beds: 1,
    baths: 1,
    kitchens: 1,
    sqft: 22.5,
    buildingName: 'Chapter One Spark Charan',
    description: {
      roomInfo: 'Premium 1 room',
      location: '150m to MRT station',
      highlights: ['Pool', 'Gym'],
    },
  }

  describe('showOnlyMain mode', () => {
    it('renders property title', () => {
      render(<PropertyDetails property={mockProperty} showOnlyMain={true} />)
      expect(screen.getByText('Bangkok MRT Apartment')).toBeInTheDocument()
    })

    it('renders property address', () => {
      render(<PropertyDetails property={mockProperty} showOnlyMain={true} />)
      expect(screen.getByText('Bang Ao, Bang Phlat, Bangkok 10700')).toBeInTheDocument()
    })

    it('renders property features correctly', () => {
      render(<PropertyDetails property={mockProperty} showOnlyMain={true} />)
      expect(screen.getByText('1 Bed')).toBeInTheDocument()
      expect(screen.getByText('1 Bath')).toBeInTheDocument()
      expect(screen.getByText('1 Kit')).toBeInTheDocument()
      expect(screen.getByText('22.5 sq')).toBeInTheDocument()
    })

    it('uses default value for kitchens when not provided', () => {
      const propertyWithoutKitchens = { ...mockProperty, kitchens: undefined }
      render(<PropertyDetails property={propertyWithoutKitchens} showOnlyMain={true} />)
      expect(screen.getByText('1 Kit')).toBeInTheDocument()
    })
  })

  describe('showOnlyDescription mode', () => {
    it('renders building name', () => {
      const onToggle = vi.fn()
      render(
        <PropertyDetails
          property={mockProperty}
          showOnlyDescription={true}
          onToggleFullscreen={onToggle}
        />
      )
      expect(screen.getByText('Chapter One Spark Charan')).toBeInTheDocument()
    })

    it('calls onToggleFullscreen when clicked', () => {
      const onToggle = vi.fn()
      const { container } = render(
        <PropertyDetails
          property={mockProperty}
          showOnlyDescription={true}
          onToggleFullscreen={onToggle}
        />
      )
      const clickableDiv = container.querySelector('.cursor-pointer')
      clickableDiv.click()
      expect(onToggle).toHaveBeenCalledTimes(1)
    })
  })

  describe('fullscreen mode', () => {
    it('renders close button in fullscreen', () => {
      const onToggle = vi.fn()
      render(
        <PropertyDetails
          property={mockProperty}
          showOnlyDescription={true}
          isFullscreen={true}
          onToggleFullscreen={onToggle}
        />
      )
      const closeButton = screen.getByRole('button')
      expect(closeButton).toBeInTheDocument()
    })
  })
})
