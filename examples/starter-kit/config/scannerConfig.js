import serviceDescriptions from "./serviceDescriptions.js"

// The scannerConfig controls how scanned devices are filtered.

export default {
	// Do not filter devices.
	// You could use `export default undefined` as well.
	acceptAllDevices: true,

	/*
	filters: [
		{
			// These services must be advertised by the device.
			services:
				serviceDescriptions
				.map(serviceDescription => serviceDescription.uuid)
		}
	],
	*/

	// These services can be discovered when connecting the device.
	optionalServices:
		serviceDescriptions
		.map(serviceDescription => serviceDescription.uuid)
}