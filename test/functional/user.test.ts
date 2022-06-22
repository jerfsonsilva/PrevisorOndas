import { iUser, UserModel } from '@src/models/user.model'

describe('User functional test', () => {
  describe('When creating a user', () => {
    beforeEach(async () => {
      await UserModel.deleteMany({})
    })
    it('should create a new user and return 201 - success', async () => {
      const newUser: iUser = {
        name: 'jerfsonlink',
        email: 'jerfsonlink@gmail.com',
        password: 'teste',
      }
      const response = await global.testRequest.post('/user').send(newUser)
      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining(newUser))
    })

    it('should return 500', async () => {
      await global.server.close()
      const newBeach = {
        name: 1,
        email: 'jerfsonlink@gmail.com',
        password: 'teste',
      }
      const response = await global.testRequest.post('/user').send(newBeach)
      expect(response.status).toBe(500)
      expect(response.body).toEqual({ error: 'Internal server error' })
    })
  })
})
