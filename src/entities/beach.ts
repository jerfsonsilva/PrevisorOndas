import { iForecastPoint } from '@src/interfaces/stormGlass'

export enum BeachPosition {
  S = 'S',
  E = 'E',
  W = 'W',
  N = 'N',
}

export interface iBeach {
  name: string
  position: BeachPosition
  lat: number
  lng: number
  user: string
}

export interface iBeachForecast extends Omit<iBeach, 'user'>, iForecastPoint {}
