import {
  iForecastPoint,
  iStormGlassForecastResponse,
  iStormGlassPoint,
} from '@src/interfaces/stormGlass'
import { InternalError } from '@src/util/errors/internal.error'
import { AxiosStatic } from 'axios'

export class ClientRequestError extends InternalError{
	constructor(message: string){
		const internalError = `Error when try access stormglass`
		super(`${internalError}: ${message}`)
	}
}

export class StormGlassClient {
  readonly params =
    'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed'
  readonly stormGlassAPISource = 'noaa'
  readonly header = {
    headers: {
      Authorization: `1d57dcaa-eda0-11ec-82d7-0242ac130002-1d57dd22-eda0-11ec-82d7-0242ac130002`,
    },
  }
  constructor(protected axios: AxiosStatic) {}
  public async getPoints(lat: number, lng: number): Promise<iForecastPoint[]> {
    try {
      const response = await this.axios.get<iStormGlassForecastResponse>(
        `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${this.params}&source=${this.stormGlassAPISource}`,
        this.header
      )
      if (!response.data) return []
      return this.normalizePoints(response.data)
    } catch (error) {
		console.log(error)
      const err = error as InternalError
      throw new ClientRequestError(err.message)
    }
  }
  private async normalizePoints(
    points: iStormGlassForecastResponse
  ): Promise<iForecastPoint[]> {
    return points.hours.filter(this.isValidPoint.bind(this)).map((point) => ({
      time: point.time,
      waveDirection: point.waveDirection[this.stormGlassAPISource],
      waveHeight: point.waveHeight[this.stormGlassAPISource],
      windDirection: point.windDirection[this.stormGlassAPISource],
      windSpeed: point.windSpeed[this.stormGlassAPISource],
      swellDirection: point.swellDirection[this.stormGlassAPISource],
      swellHeight: point.swellHeight[this.stormGlassAPISource],
      swellPeriod: point.swellPeriod[this.stormGlassAPISource],
    }))
  }
  private isValidPoint(point: Partial<iStormGlassPoint>): boolean {
    return !!(
      point.time &&
      point.swellDirection?.[this.stormGlassAPISource] &&
      point.swellHeight?.[this.stormGlassAPISource] &&
      point.swellPeriod?.[this.stormGlassAPISource] &&
      point.waveDirection?.[this.stormGlassAPISource] &&
      point.waveHeight?.[this.stormGlassAPISource] &&
      point.windDirection?.[this.stormGlassAPISource] &&
      point.windSpeed?.[this.stormGlassAPISource]
    )
  }
}
