import { BeachPosition, iBeach } from '@entities/beach'

describe('Beach functional test', () => {
  describe('When creating a beach', () => {
    it('should create a new beach and return 201 - success', async () => {
      const newBeach: iBeach = {
        lat: 10,
        lng: 12,
        name: 'Mali',
        position: BeachPosition.N,
      }
      const response = await global.testRequest.post('/beach').send(newBeach)
      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining(newBeach))
    })

    it('should return 422 when try create a new beach - error', async () => {
      const newBeach = {
        lat: 'param invalid',
        lng: 12,
        name: 'Mali',
        position: BeachPosition.N,
      }
      const response = await global.testRequest.post('/beach').send(newBeach)
      expect(response.status).toBe(422)
      expect(response.body).toEqual({
        error: expect.stringContaining('Beach validation failed: lat'),
      })
    })
    it('should return 500', async () => {
      await global.server.close()
      const newBeach = {
        lat: 10,
        lng: 12,
        name: 'Mali',
        position: BeachPosition.N,
      }
      const response = await global.testRequest.post('/beach').send(newBeach)
      expect(response.status).toBe(500)
      expect(response.body).toEqual({ error: 'Internal server error' })
    })
  })
})
