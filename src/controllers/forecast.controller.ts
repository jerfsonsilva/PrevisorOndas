import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'

@Controller('forecast')
export class ForecastController {
  @Get('')
  public getForecast(_: Request, res: Response): void {
    res.status(200)
    res.send({ result: true })
  }
}
