import { StormGlassClient } from '@src/clients/stormGlass.client'
import axios from 'axios'
import mockResponseStorm from '@test/mocks/stormGlass_response.mock.json'
import mockResponseStormNormalize from '@test/mocks/stormGlass_response_normalized.mock.json'

jest.mock('axios')

describe('StormGlass client', () => {
  it('should return the forecast normalized', async () => {
    const lat = -33.0
    const long = 10.0

    const mockAxios = axios as jest.Mocked<typeof axios>
    mockAxios.get.mockResolvedValue({ data: mockResponseStorm })

    const stormGlass = new StormGlassClient(mockAxios)
    const response = await stormGlass.getPoints(lat, long)

    expect(response).toEqual(mockResponseStormNormalize)
  })

  it('should return Error in invalid forecast', async () => {
    const lat = -331.0
    const long = 102.0
    const mockResponseStormInvalid = {
      hours: [
        {
          swellDirection: {
            noaa: 194.21,
          },
        },
      ],
    }
    const mockAxios = axios as jest.Mocked<typeof axios>
    mockAxios.get.mockResolvedValue({ data: mockResponseStormInvalid })

    const stormGlass = new StormGlassClient(mockAxios)
    const response = await stormGlass.getPoints(lat, long)

    expect(response).toEqual([])
  })
  it('should return internal error', async () => {
    const lat = -331.0
    const long = 102.0

    const mockAxios = axios as jest.Mocked<typeof axios>
    const error = 'Network error'
    mockAxios.get.mockRejectedValue({ message: error })

    const stormGlass = new StormGlassClient(mockAxios)

    await expect(stormGlass.getPoints(lat, long)).rejects.toThrow(
      `Error when try access stormglass: ${error}`
    )
  })
})
