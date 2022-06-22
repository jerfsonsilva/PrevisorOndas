import { Server } from '@overnightjs/core'
import bodyParser from 'body-parser'
import { Application } from 'express'
import { BeachController } from '@controllers/beach.controller'
import { ForecastController } from '@controllers/forecast.controller'
import { UsersController } from '@controllers/user.controller'
import * as database from '@database/mongoDataBase'
import '@util/module-alias'

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super()
  }
  public async init(): Promise<void> {
    this.setupExpress()
    this.setupControllers()
    await this.databaseSetup()
  }
  private setupExpress(): void {
    this.app.use(bodyParser.json())
  }
  private setupControllers(): void {
    const forecastController = new ForecastController()
    const beachController = new BeachController()
    const userController = new UsersController()
    this.addControllers([forecastController, beachController, userController])
  }
  public getApp(): Application {
    return this.app
  }
  public async close(): Promise<void> {
    await database.close()
  }
  private async databaseSetup(): Promise<void> {
    await database.connect()
  }
}
