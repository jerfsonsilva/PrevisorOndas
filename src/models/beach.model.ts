import mongoose, { Document } from 'mongoose'
import { BeachPosition } from '@entities/beach'

export interface iBeach {
  _id?: string
  name: string
  position: BeachPosition
  lat: number
  lng: number
}

export interface iBeachModel extends Omit<iBeach, '_id'>, Document {}

const schema = new mongoose.Schema<iBeachModel>(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
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

export const BeachModel = mongoose.model<iBeachModel>('Beach', schema)
