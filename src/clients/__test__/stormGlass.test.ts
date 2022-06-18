import { StormGlassClient } from '@src/clients/stormGlass.client'
import mockResponseStorm from '@test/mocks/stormGlass_response.mock.json'
import mockResponseStormNormalize from '@test/mocks/stormGlass_response_normalized.mock.json'
import * as HTTPUtil from '@src/util/request'

jest.mock('@src/util/request')

describe('StormGlass client', () => {
  const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>
  const latMock = -33.0
  const lngMock = 10.0

  it('should return the forecast normalized', async () => {
    mockedRequest.get.mockResolvedValue({
      data: mockResponseStorm,
    } as HTTPUtil.Response)

    const stormGlass = new StormGlassClient(mockedRequest)
    const response = await stormGlass.getPoints(latMock, lngMock)

    expect(response).toEqual(mockResponseStormNormalize)
  })

  it('should return empty forecast', async () => {
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
    const response = await stormGlass.getPoints(latMock, lngMock)

    expect(response).toEqual([])
  })

  it('should return internal error', async () => {
    const error = 'Network error'
    mockedRequest.get.mockRejectedValue({ message: error })
    const stormGlass = new StormGlassClient(mockedRequest)
    await expect(stormGlass.getPoints(latMock, lngMock)).rejects.toThrow(error)
  })
})
