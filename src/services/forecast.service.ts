import { StormGlassClient } from '@clients/stormGlass.client'
import { iBeach, iBeachForecast, iTimeForecast } from '@entities/beach'
import { InternalError } from '@util/errors/internal.error'

export class ForecastService {
  constructor(protected stormGlass = new StormGlassClient()) {}

  public async processForecastForBeaches(
    beaches: iBeach[]
  ): Promise<iTimeForecast[]> {
    try {
      const pointsWithCorrectSources: iBeachForecast[] = []
      for (const beach of beaches) {
        const points = await this.stormGlass.getPoints(beach.lat, beach.lng)
        const beachDataFull = points.map((item) => ({
          lat: beach.lat,
          lng: beach.lng,
          name: beach.name,
          position: beach.position,
          rating: 1,// TODO implements function to calc the rating
          ...item,
        }))
        pointsWithCorrectSources.push(...beachDataFull)
      }
      return this.mapForecastByTime(pointsWithCorrectSources)
    } catch (error) {
      throw new InternalError((error as Error).message)
    }
  }
  private mapForecastByTime(forecast: iBeachForecast[]): iTimeForecast[] {
    const forecastByTime: iTimeForecast[] = []
    for (const point of forecast) {
      const timePoint = forecastByTime.find((f) => f.time === point.time)
      if (timePoint) {
        timePoint.forecast.push(point)
      } else {
        forecastByTime.push({
          time: point.time,
          forecast: [point],
        })
      }
    }
    return forecastByTime
  }
}
