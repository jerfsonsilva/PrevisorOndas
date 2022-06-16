import { AxiosStatic } from "axios";

export class StormGlassClient {
	readonly params = 'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed'
	readonly stormGlassAPISource = 'noaa'
	readonly header = {
		headers: {
			'Authorization': `1d57dcaa-eda0-11ec-82d7-0242ac130002-1d57dd22-eda0-11ec-82d7-0242ac130002` 
		}
	}
	constructor(protected axios: AxiosStatic) {}
	getPoints(lat: number, lng: number): Promise<{}>{
		return this.axios.get(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${this.params}&source=${this.stormGlassAPISource}`, this.header)
	}
}