import { iForecastPoint } from '@src/entities/stormGlass'

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

export interface iTimeForecast {
  time: string;
  forecast: iBeachForecast[];
}