import { StormGlassClient } from '@src/clients/stormGlass.client'
import axios from 'axios'
import mockResponseStorm from '@test/mocks/stormGlass_response.mock.json'
import mockResponseStormNormalize from '@test/mocks/stormGlass_response_normalized.mock.json'

jest.mock('axios')

describe('StormGlass client', () => {
  it('should return the forecast normalized', async () => {
    const lat = -33.0
    const long = 10.0
    axios.get = jest.fn().mockResolvedValue({ data: mockResponseStorm })

    const stormGlass = new StormGlassClient(axios)
    const response = await stormGlass.getPoints(lat, long)

    expect(response).toEqual(mockResponseStormNormalize)
  })
})
