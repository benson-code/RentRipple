import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ContactFooter from '../ContactFooter'

describe('ContactFooter', () => {
  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  it('renders price correctly', () => {
    renderWithRouter(<ContactFooter price={13500} currency="฿" priceUnit="month" />)
    expect(screen.getByText('฿13,500')).toBeInTheDocument()
    expect(screen.getByText('per month')).toBeInTheDocument()
  })

  it('formats price with commas', () => {
    renderWithRouter(<ContactFooter price={150000} currency="$" priceUnit="month" />)
    expect(screen.getByText('$150,000')).toBeInTheDocument()
  })

  it('renders different price units', () => {
    const { rerender } = renderWithRouter(
      <ContactFooter price={1000} currency="฿" priceUnit="week" />
    )
    expect(screen.getByText('per week')).toBeInTheDocument()

    rerender(
      <BrowserRouter>
        <ContactFooter price={1000} currency="฿" priceUnit="day" />
      </BrowserRouter>
    )
    expect(screen.getByText('per day')).toBeInTheDocument()
  })

  it('renders Rent button', () => {
    renderWithRouter(<ContactFooter price={13500} currency="฿" priceUnit="month" />)
    expect(screen.getByText('Rent')).toBeInTheDocument()
  })
})
