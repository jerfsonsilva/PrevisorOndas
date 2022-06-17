import { StormGlassClient } from '@src/clients/stormGlass.client'
import { iBeach, iBeachForecast } from '@src/entities/beach'
import * as HTTPUtil from '@src/util/request'

export class ForecastService {
  constructor(
    protected stormGlass = new StormGlassClient(new HTTPUtil.Request())
  ) {}

  public async processForecastForBeaches(
    beaches: iBeach[]
  ): Promise<iBeachForecast[]> {
    const pointsWithCorrectSources: iBeachForecast[] = []
    for (const beach of beaches) {
      const points = await this.stormGlass.getPoints(beach.lat, beach.lng)
      const beachDataFull = points.map((item) => ({
        lat: beach.lat,
        lng: beach.lng,
        name: beach.name,
        position: beach.position,
        rating: 1,
        ...item,
      }))
      pointsWithCorrectSources.push(...beachDataFull)
    }
    return pointsWithCorrectSources
  }
}
