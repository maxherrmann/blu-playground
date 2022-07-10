const { Device } = blu

import serviceDescriptions from "./serviceDescriptions.js"

export default class BatteryDevice extends Device {
	serviceDescriptions = serviceDescriptions

	constructor(bluetoothDevice) {
		super(bluetoothDevice)

		this.addChannel("battery-level-changed")
	}

	get batteryLevel() {
		return this.batteryService.batteryLevel
	}
}