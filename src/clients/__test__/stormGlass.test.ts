import { StormGlassClient } from '@src/clients/stormGlass.client'
import mockResponseStorm from '@test/mocks/stormGlass_response.mock.json'
import mockResponseStormNormalize from '@test/mocks/stormGlass_response_normalized.mock.json'
import * as HTTPUtil from '@src/util/request'

jest.mock('@src/util/request')

describe('StormGlass client', () => {
  const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>
  it('should return the forecast normalized', async () => {
    const lat = -33.0
    const long = 10.0
    mockedRequest.get.mockResolvedValue({
      data: mockResponseStorm,
    } as HTTPUtil.Response)

    const stormGlass = new StormGlassClient(mockedRequest)
    const response = await stormGlass.getPoints(lat, long)

    expect(response).toEqual(mockResponseStormNormalize)
  })

  it('should return empty forecast', async () => {
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
    mockedRequest.get.mockResolvedValue({
      data: mockResponseStormInvalid,
    } as HTTPUtil.Response)

    const stormGlass = new StormGlassClient(mockedRequest)
    const response = await stormGlass.getPoints(lat, long)

    expect(response).toEqual([])
  })
  it('should return internal error', async () => {
    const lat = -331.0
    const long = 102.0

    const error = 'Network error'
    mockedRequest.get.mockRejectedValue({ message: error })

    const stormGlass = new StormGlassClient(mockedRequest)

    await expect(stormGlass.getPoints(lat, long)).rejects.toThrow(
      error
    )
  })
})
