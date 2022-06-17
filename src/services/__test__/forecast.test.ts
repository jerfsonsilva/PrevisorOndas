import { StormGlassClient } from '@src/clients/stormGlass.client'
import mockResponseStormNormalize from '@test/mocks/stormGlass_response_normalized.mock.json'
import { ForecastService } from '../forecast.service'
import { BeachPosition, iBeach } from '@src/entities/beach'

jest.mock('@src/clients/stormGlass.client')

describe('Forecast service', () => {
  it('should return the list of beaches', async () => {
    const stormGlassMocked =
      new StormGlassClient() as jest.Mocked<StormGlassClient>
    stormGlassMocked.getPoints.mockResolvedValue(mockResponseStormNormalize)
    const beaches = [
      {
        lat: 10,
        lng: 11,
        name: 'mali',
        position: BeachPosition.E,
        user: 'some',
      },
    ] as iBeach[]

    const expectedResponse = [
      {
        lat: beaches[0].lat,
        lng: beaches[0].lng,
        name: beaches[0].name,
        position: beaches[0].position,
        rating: 1,
        ...mockResponseStormNormalize[0],
      },
    ]
    const forecast = new ForecastService(stormGlassMocked)
    const beachRating = await forecast.processForecastForBeaches(beaches)
    expect(beachRating).toEqual(expectedResponse)
  })
})
