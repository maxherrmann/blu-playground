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

	get modelNumber() {
		return this.deviceInformationService.modelNumber
	}

	get serialNumber() {
		return this.deviceInformationService.serialNumber
	}

	get hardwareRevision() {
		return this.deviceInformationService.hardwareRevision
	}

	get firmwareRevision() {
		return this.deviceInformationService.firmwareRevision
	}

	get manufacturerName() {
		return this.deviceInformationService.manufacturerName
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