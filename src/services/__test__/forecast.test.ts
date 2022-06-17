import { StormGlassClient } from '@src/clients/stormGlass.client'
import mockResponseStormNormalize from '@test/mocks/stormGlass_reponse_normalized_3.mock.json'
import mockResponseStormListBeach from '@test/mocks/stormGlass_response_list_beach.json'
import { ForecastService } from '../forecast.service'
import { BeachPosition, iBeach } from '@src/entities/beach'

jest.mock('@src/clients/stormGlass.client')

describe('Forecast service', () => {
  it('should return the list of beaches', async () => {
    const stormGlassMocked = new StormGlassClient() as jest.Mocked<StormGlassClient>
    stormGlassMocked.getPoints.mockResolvedValue(mockResponseStormNormalize)
    const {lat, lng, name} = mockResponseStormListBeach[0].forecast[0]
	const beaches = [
      {
        lat,
        lng,
        name,
        position: BeachPosition.E,
        user: 'some',
      },
    ] as iBeach[]

    const forecast = new ForecastService(stormGlassMocked)
    const beachRating = await forecast.processForecastForBeaches(beaches)
    expect(beachRating).toEqual(mockResponseStormListBeach)
  })
})
