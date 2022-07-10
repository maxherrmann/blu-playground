const { Device } = blu

import serviceDescriptions from "./serviceDescriptions.js"

export default class MyDevice extends Device {
	serviceDescriptions = serviceDescriptions

	// Add your custom properties here.
	// e.g. description = …

	// Optional constructor.
	// If it does not implement anything, you can remove it.
	constructor(bluetoothDevice) {
		super(bluetoothDevice)

		// Add your custom interface here.
		// e.g. `this.addChannel("battery-level-changed")`
	}

	// Add your custom interface here.
	// e.g. `get batteryLevel() { … }`
}