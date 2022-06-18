import { StormGlassClient } from '@src/clients/stormGlass.client'
import mockResponseStormNormalize from '@test/mocks/stormGlass_reponse_normalized_3.mock.json'
import mockResponseStormListBeach from '@test/mocks/stormGlass_response_list_beach.json'
import { ForecastService } from '../forecast.service'
import { BeachPosition, iBeach } from '@src/entities/beach'
import { InternalError } from '@src/util/errors/internal.error'

jest.mock('@src/clients/stormGlass.client')

describe('Forecast service', () => {
  const stormGlassMocked =
    new StormGlassClient() as jest.Mocked<StormGlassClient>
    const { lat, lng, name } = mockResponseStormListBeach[0].forecast[0]
    const beachesMock = [
      {
        lat,
        lng,
        name,
        position: BeachPosition.E,
        user: 'some'
      },
    ] as iBeach[]
  it('should return the list of beaches', async () => {
    stormGlassMocked.getPoints.mockResolvedValue(mockResponseStormNormalize)

    const forecast = new ForecastService(stormGlassMocked)
    const beachRating = await forecast.processForecastForBeaches(beachesMock)
    expect(beachRating).toEqual(mockResponseStormListBeach)
  })
  it('should return empty beach', async () => {
    const forecast = new ForecastService()
    const response = await forecast.processForecastForBeaches([])
    expect(response).toEqual([])
  })
  it('should return internal error', async () => {
    const errorMessage = 'Message geting data'
    stormGlassMocked.getPoints.mockRejectedValue({message: errorMessage})
    const forecast = new ForecastService(stormGlassMocked)
    await expect(
      forecast.processForecastForBeaches(beachesMock)
    ).rejects.toThrowError(new InternalError(errorMessage))
  })
})
