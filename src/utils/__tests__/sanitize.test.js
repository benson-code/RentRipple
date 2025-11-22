import { describe, it, expect } from 'vitest'
import { sanitizeHTML, sanitizeObject, validateProperty } from '../sanitize'

describe('sanitize utilities', () => {
  describe('sanitizeHTML', () => {
    it('removes HTML tags by default', () => {
      const dirty = '<script>alert("xss")</script>Hello'
      const clean = sanitizeHTML(dirty)
      expect(clean).toBe('Hello')
      expect(clean).not.toContain('<script>')
    })

    it('removes dangerous attributes', () => {
      const dirty = '<img src="x" onerror="alert(1)">'
      const clean = sanitizeHTML(dirty)
      expect(clean).not.toContain('onerror')
    })

    it('handles non-string input', () => {
      expect(sanitizeHTML(123)).toBe(123)
      expect(sanitizeHTML(null)).toBe(null)
      expect(sanitizeHTML(undefined)).toBe(undefined)
    })

    it('preserves safe text content', () => {
      const text = 'Hello World 123'
      expect(sanitizeHTML(text)).toBe(text)
    })

    it('removes all tags with default options', () => {
      const dirty = '<div><p>Test</p></div>'
      const clean = sanitizeHTML(dirty)
      expect(clean).toBe('Test')
    })
  })

  describe('sanitizeObject', () => {
    it('sanitizes string properties', () => {
      const obj = {
        title: '<script>alert("xss")</script>Safe Title',
        description: 'Normal text',
      }
      const clean = sanitizeObject(obj)
      expect(clean.title).toBe('Safe Title')
      expect(clean.description).toBe('Normal text')
    })

    it('sanitizes nested objects', () => {
      const obj = {
        property: {
          name: '<img src=x onerror=alert(1)>Property Name',
          details: {
            info: '<b>Bold</b> text',
          },
        },
      }
      const clean = sanitizeObject(obj)
      expect(clean.property.name).toBe('Property Name')
      expect(clean.property.details.info).toBe('Bold text')
    })

    it('sanitizes arrays', () => {
      const arr = ['<script>bad</script>Good', 'Normal', '<b>Test</b>']
      const clean = sanitizeObject(arr)
      expect(clean).toEqual(['Good', 'Normal', 'Test'])
    })

    it('preserves numbers and booleans', () => {
      const obj = {
        price: 13000,
        available: true,
        rating: 4.5,
      }
      const clean = sanitizeObject(obj)
      expect(clean.price).toBe(13000)
      expect(clean.available).toBe(true)
      expect(clean.rating).toBe(4.5)
    })

    it('handles null and undefined', () => {
      expect(sanitizeObject(null)).toBe(null)
      expect(sanitizeObject(undefined)).toBe(undefined)
    })

    it('sanitizes mixed arrays and objects', () => {
      const data = {
        items: [
          { name: '<script>xss</script>Item 1', price: 100 },
          { name: 'Item 2', price: 200 },
        ],
      }
      const clean = sanitizeObject(data)
      expect(clean.items[0].name).toBe('Item 1')
      expect(clean.items[0].price).toBe(100)
    })
  })

  describe('validateProperty', () => {
    it('validates and sanitizes valid property', () => {
      const property = {
        title: 'Test Property',
        price: 13000,
        description: 'Nice place',
      }
      const result = validateProperty(property)
      expect(result.title).toBe('Test Property')
      expect(result.price).toBe(13000)
    })

    it('throws error for missing title', () => {
      const property = {
        title: '',
        price: 13000,
      }
      expect(() => validateProperty(property)).toThrow('Title is required')
    })

    it('throws error for missing title (whitespace only)', () => {
      const property = {
        title: '   ',
        price: 13000,
      }
      expect(() => validateProperty(property)).toThrow('Title is required')
    })

    it('throws error for invalid price', () => {
      const property = {
        title: 'Test',
        price: -100,
      }
      expect(() => validateProperty(property)).toThrow('Valid price is required')
    })

    it('throws error for non-number price', () => {
      const property = {
        title: 'Test',
        price: 'not a number',
      }
      expect(() => validateProperty(property)).toThrow('Valid price is required')
    })

    it('sanitizes XSS attempts in property data', () => {
      const property = {
        title: '<script>alert("xss")</script>Clean Title',
        price: 13000,
        description: '<img src=x onerror=alert(1)>Description',
      }
      const result = validateProperty(property)
      expect(result.title).toBe('Clean Title')
      expect(result.description).toBe('Description')
    })

    it('accepts zero price', () => {
      const property = {
        title: 'Free Property',
        price: 0,
      }
      expect(() => validateProperty(property)).not.toThrow()
    })

    it('throws multiple errors at once', () => {
      const property = {
        title: '',
        price: -100,
      }
      expect(() => validateProperty(property)).toThrow()
    })
  })
})
