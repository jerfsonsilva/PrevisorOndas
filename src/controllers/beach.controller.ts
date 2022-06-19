import { Controller, Post } from '@overnightjs/core'
import { BeachModel } from '@src/models/beach.model'
import { Request, Response } from 'express'
import mongoose from 'mongoose'

@Controller('beach')
export class BeachController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const beach = new BeachModel(req.body)
      const result = await beach.save()
      res.status(201).send(result)
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(422).send({ error: (error as Error).message })
      } else {
        res.status(500).send({ error: 'Internal server error' })
      }
    }
  }
}
