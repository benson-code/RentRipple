import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getProperty, updateProperty, resetProperty, uploadImage } from '../propertyAPI'

// Mock fetch globally
global.fetch = vi.fn()

describe('propertyAPI', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    fetch.mockClear()
    localStorage.clear()
  })

  describe('getProperty', () => {
    it('fetches property data successfully', async () => {
      const mockData = {
        title: 'Test Property',
        price: 13000,
        currency: '฿',
      }

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await getProperty()
      expect(result).toEqual(mockData)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/property'),
        expect.objectContaining({
          cache: 'no-cache',
        })
      )
    })

    it('adds timestamp query parameter', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })

      await getProperty()
      const callUrl = fetch.mock.calls[0][0]
      expect(callUrl).toMatch(/\?t=\d+/)
    })

    it('uses custom query parameters', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })

      await getProperty('?custom=param')
      const callUrl = fetch.mock.calls[0][0]
      expect(callUrl).toContain('?custom=param')
    })

    it('returns default data on fetch error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await getProperty()
      expect(result).toHaveProperty('title')
      expect(result).toHaveProperty('price')
      expect(result.title).toBe('Cozy MRT Apartment')
    })

    it('returns default data on HTTP error', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      const result = await getProperty()
      expect(result).toHaveProperty('title')
      expect(result.price).toBe(13000)
    })

    it('sets no-cache headers', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })

      await getProperty()
      const headers = fetch.mock.calls[0][1].headers
      expect(headers['Cache-Control']).toBe('no-cache, no-store, must-revalidate')
      expect(headers['Pragma']).toBe('no-cache')
    })
  })

  describe('updateProperty', () => {
    it('updates property successfully', async () => {
      const propertyData = {
        title: 'Updated Property',
        price: 15000,
      }

      const mockResponse = {
        message: 'Property updated successfully',
        property: propertyData,
      }

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await updateProperty(propertyData)
      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/property'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(propertyData),
        })
      )
    })

    it('throws error on failed update', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
      })

      await expect(updateProperty({ title: 'Test' })).rejects.toThrow()
    })

    it('throws error on network failure', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(updateProperty({ title: 'Test' })).rejects.toThrow('Network error')
    })
  })

  describe('resetProperty', () => {
    it('resets property to default', async () => {
      const mockResponse = {
        message: 'Property reset to default',
        property: {},
      }

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await resetProperty()
      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/property'),
        expect.objectContaining({
          method: 'DELETE',
        })
      )
    })

    it('throws error on failed reset', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      await expect(resetProperty()).rejects.toThrow()
    })
  })

  describe('uploadImage', () => {
    it('uploads image successfully', async () => {
      const imageData = 'data:image/png;base64,iVBORw0KGgo='
      const imageName = 'test.png'

      const mockResponse = {
        success: true,
        url: 'https://example.com/uploaded.png',
      }

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await uploadImage(imageData, imageName)
      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/upload-image'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.stringContaining(imageData),
        })
      )
    })

    it('includes image name in request', async () => {
      const imageData = 'data:image/png;base64,test'
      const imageName = 'my-image.png'

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      await uploadImage(imageData, imageName)
      const requestBody = JSON.parse(fetch.mock.calls[0][1].body)
      expect(requestBody.imageName).toBe(imageName)
    })

    it('throws error on failed upload', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
      })

      await expect(uploadImage('data:image/png;base64,test', 'test.png')).rejects.toThrow()
    })

    it('throws error on network failure', async () => {
      fetch.mockRejectedValueOnce(new Error('Upload failed'))

      await expect(uploadImage('data:image/png;base64,test', 'test.png')).rejects.toThrow(
        'Upload failed'
      )
    })
  })
})
