import serviceDescriptions from "./serviceDescriptions.js"

export default {
	filters: [
		{
			namePrefix: "BBC micro:bit"
		}
	],
	optionalServices:
		serviceDescriptions
		.map(serviceDescription => serviceDescription.uuid)
}