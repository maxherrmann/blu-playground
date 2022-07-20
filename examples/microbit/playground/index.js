const { bluetooth } = blu

bluetooth.on("device-connected", device => {
	updateDeviceInformation(device)
	updateButtonStates(device.buttonStates)
	updateTemperature(device.temperature)

	device.on("button-states-changed", updateButtonStates)
	device.on("temperature-changed", updateTemperature)
})

function updateDeviceInformation(device) {
	let modelNumberNode = document.querySelector("#model-number")
	let serialNumberNode = document.querySelector("#serial-number")
	let hardwareRevisionNode = document.querySelector("#hardware-revision")
	let firmwareRevisionNode = document.querySelector("#firmware-revision")
	let manufacturerNameNode = document.querySelector("#manufacturer-name")

	modelNumberNode.innerHTML = device.modelNumber ?? "Unknown"
	serialNumberNode.innerHTML = device.serialNumber ?? "Unknown"
	hardwareRevisionNode.innerHTML = device.hardwareRevision ?? "Unknown"
	firmwareRevisionNode.innerHTML = device.firmwareRevision ?? "Unknown"
	manufacturerNameNode.innerHTML = device.manufacturerName ?? "Unknown"
}

function updateButtonStates(buttonStates) {
	let buttonAStateNode = document.querySelector("#button-a-state")
	let buttonBStateNode = document.querySelector("#button-b-state")

	buttonAStateNode.innerHTML = getButtonStateString(buttonStates.a)
	buttonBStateNode.innerHTML = getButtonStateString(buttonStates.b)
}

function getButtonStateString(buttonState) {
	switch(buttonState) {
		case 0: return "Not Pressed"
		case 1: return "Pressed"
		case 2: return "Long Pressed"
		default: return "Unknown"
	}
}

function updateTemperature(temperature) {
	let temperatureNode = document.querySelector("#temperature")

	temperatureNode.innerHTML = temperature
}