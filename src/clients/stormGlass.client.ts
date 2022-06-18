import {
  iForecastPoint,
  iStormGlassForecastResponse,
  iStormGlassPoint,
} from '@entities/stormGlass'
import { InternalError } from '@util/errors/internal.error'
import config, { IConfig } from 'config'
import * as HTTPUtil from '@util/request'
const stormGlassResourceConfig: IConfig = config.get('App.resources.StormGlass')

export class StormGlassClient {
  readonly params =
    'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed'
  readonly stormGlassAPISource = 'noaa'
  readonly header = {
    headers: {
      Authorization: `${stormGlassResourceConfig.get('token')}`,
    },
  }
  constructor(protected request = new HTTPUtil.Request()) {}

  public async getPoints(lat: number, lng: number): Promise<iForecastPoint[]> {
    try {
      const response = await this.request.get<iStormGlassForecastResponse>(
        `${stormGlassResourceConfig.get(
          'url'
        )}/weather/point?lat=${lat}&lng=${lng}&params=${this.params}&source=${
          this.stormGlassAPISource
        }`,
        this.header
      )
      if (!response.data) return []
      return this.normalizePoints(response.data)
    } catch (error) {
      throw new InternalError((error as Error).message)
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
