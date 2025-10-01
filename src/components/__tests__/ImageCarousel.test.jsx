import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ImageCarousel from '../ImageCarousel'

describe('ImageCarousel', () => {
  const mockImages = [
    { id: 'img1', name: 'Living Room', url: 'https://example.com/1.jpg' },
    { id: 'img2', name: 'Bedroom', url: 'https://example.com/2.jpg' },
    { id: 'img3', name: 'Kitchen', url: 'https://example.com/3.jpg' },
  ]

  it('renders all images', () => {
    const { container } = render(<ImageCarousel images={mockImages} title="Test Property" />)
    const imageElements = container.querySelectorAll('.bg-cover')
    expect(imageElements).toHaveLength(3)
  })

  it('renders navigation dots equal to number of images', () => {
    const { container } = render(<ImageCarousel images={mockImages} title="Test Property" />)
    const dots = container.querySelectorAll('.rounded-full.cursor-pointer')
    expect(dots).toHaveLength(3)
  })

  it('renders with empty images array', () => {
    const { container } = render(<ImageCarousel images={[]} title="Test Property" />)
    const imageElements = container.querySelectorAll('.bg-cover')
    expect(imageElements).toHaveLength(0)
  })

  it('applies correct background image styles', () => {
    const { container } = render(<ImageCarousel images={mockImages} title="Test Property" />)
    const firstImage = container.querySelector('.bg-cover')
    expect(firstImage.style.backgroundImage).toContain('https://example.com/1.jpg')
  })
})
