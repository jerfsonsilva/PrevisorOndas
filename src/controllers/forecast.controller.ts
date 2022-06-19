import { Controller, Get } from '@overnightjs/core'
import { BeachModel } from '@src/models/beach.model'
import { ForecastService } from '@src/services/forecast.service'
import { errorListCode } from '@src/util/errors/internal.error'
import { Request, Response } from 'express'

@Controller('forecast')
export class ForecastController {
  constructor(readonly forecastService = new ForecastService()) {}
  @Get('')
  public async getForecast(_: Request, res: Response): Promise<void> {
    try {
      const beaches = await BeachModel.find({})
      const forecastData = await this.forecastService.processForecastForBeaches(
        beaches
      )
      res.status(200).send(forecastData)
    } catch (error) {
      const errorInternal = errorListCode.internalError
      res.status(errorInternal.erroCode).send({ error: errorInternal.message })
    }
  }
}
