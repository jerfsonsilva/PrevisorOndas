import { errorListCode } from '@src/util/errors/internal.error'
import nock from 'nock'
import mockResponseStorm from '@test/mocks/stormGlass_response.mock.json'
import mockResponseDefaultBeach from '@test/mocks/stormGlass_response_default_beach.json'
import { BeachPosition } from '@src/entities/beach'
import { BeachModel } from '@src/models/beach.model'

describe('Beach forecast functional test', () => {
  beforeEach(async () => {
    await BeachModel.deleteMany({})
    const defaultBeach = {
      lat: 10,
      lng: 12,
      name: 'Manly',
      position: BeachPosition.E,
    }
    const beach = new BeachModel(defaultBeach)
    await beach.save()
  })
  it('should return a forecast with beach default', async () => {
    // nock.recorder.rec()
    nock('https://api.stormglass.io', {
      encodedQueryParams: true,
      reqheaders: {
        Authorization: (): boolean => true,
      },
    })
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/v2/weather/point')
      .query({
        lat: '10',
        lng: '12',
        params: /(.*)/,
        source: 'noaa',
      })
      .reply(200, mockResponseStorm)

    const { status, body } = await global.testRequest.get('/forecast')
    expect(status).toBe(200)
    expect(body).toEqual(mockResponseDefaultBeach)
  })
  it('should return a forecast internal error', async () => {
    nock('https://api.stormglass.io', {
      encodedQueryParams: true,
      reqheaders: {
        Authorization: (): boolean => true,
      },
    })
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/v1/weather/point')
      .query({ lat: '-33.792726', lng: '151.289824' })
      .replyWithError('Something went wrong')

    const { body, status } = await global.testRequest.get('/forecast')
    expect(status).toBe(errorListCode.internalError.erroCode)
    expect(body).toEqual({ error: errorListCode.internalError.message })
  })
})
