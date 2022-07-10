const { Service } = blu

export default class TemperatureService extends Service {
	get temperature() {
		return this.temperatureCharacteristic.temperature
	}

	get temperaturePeriod() {
		return this.temperaturePeriodCharacteristic.temperaturePeriod
	}

	setTemperaturePeriod(time) {
		return this.temperaturePeriodCharacteristic.setTemperaturePeriod(time)
	}
}