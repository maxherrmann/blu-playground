const { Device } = blu

import serviceDescriptions from "./serviceDescriptions.js"

export default class NrfDevice extends Device {
	serviceDescriptions = serviceDescriptions

	constructor(bluetoothDevice) {
		super(bluetoothDevice)

		this.addChannel("firmware-update-started")
		this.addChannel("firmware-update-ended")
		this.addChannel("firmware-update-progress")
		this.addChannel("firmware-update-finished")
		this.addChannel("firmware-update-failed")
	}

	updateFirmware(firmwareFile) {
		return this.nrfDfuService.updateFirmware(firmwareFile)
	}
}