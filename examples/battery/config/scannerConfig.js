import serviceDescriptions from "./serviceDescriptions.js"

export default {
	acceptAllDevices: true,
	optionalServices:
		serviceDescriptions
		.map(serviceDescription => serviceDescription.uuid)
}