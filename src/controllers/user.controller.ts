import { Controller, Post } from '@overnightjs/core'
import { UserModel } from '@models/user.model'
import { Response, Request } from 'express'
import mongoose from 'mongoose'

@Controller('user')
export class UsersController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body
      const user = new UserModel({
        name,
        email,
        password,
      })
      const newUser = await user.save()
      res.status(201).send(newUser)
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(422).send({ error: (error as Error).message })
      } else {
        res.status(500).send({ error: 'Internal server error' })
      }
    }
  }
}
