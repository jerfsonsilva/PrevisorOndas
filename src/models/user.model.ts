import mongoose, { Document } from 'mongoose'

export interface iUser {
  _id?: string
  name: string
  email: string
  password: string
}

interface iUserModel extends Omit<iUser, '_id'>, Document {}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

export const UserModel = mongoose.model('User', schema)
