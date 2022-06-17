export interface iStormGlassPointSource {
	[key: string]: number
  }
  export interface iStormGlassPoint {
	readonly waveHeight: iStormGlassPointSource
	readonly waveDirection: iStormGlassPointSource
	readonly swellDirection: iStormGlassPointSource
	readonly swellHeight: iStormGlassPointSource
	readonly swellPeriod: iStormGlassPointSource
	readonly windDirection: iStormGlassPointSource
	readonly windSpeed: iStormGlassPointSource
	time: string
  }
  export interface iStormGlassForecastResponse {
	hours: iStormGlassPoint[]
  }
  export interface iForecastPoint {
	time: string
	waveHeight: number
	waveDirection: number
	swellDirection: number
	swellHeight: number
	swellPeriod: number
	windDirection: number
	windSpeed: number
  }
  