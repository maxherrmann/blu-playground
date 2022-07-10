const { Device } = blu

import serviceDescriptions from "./serviceDescriptions.js"

export default class Microbit extends Device {
	serviceDescriptions = serviceDescriptions

	constructor(bluetoothDevice) {
		super(bluetoothDevice)

		this.addChannel("button-states-changed")
		this.addChannel("button-a-pressed")
		this.addChannel("button-b-pressed")

		this.addChannel("temperature-changed")
	}

	get buttonStates() {
		return this.buttonService.buttonStates
	}

	get temperature() {
		return this.temperatureService.temperature
	}

	get temperaturePeriod() {
		return this.temperatureService.temperaturePeriod
	}

	setTemperaturePeriod(time) {
		return this.temperatureService.setTemperaturePeriod(time)
	}
}