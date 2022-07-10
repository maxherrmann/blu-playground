const { bluetooth } = blu

bluetooth.on("device-connected", device => {
	updateButtonStates(device.buttonStates)
	updateTemperature(device.temperature)

	device.on("button-states-changed", updateButtonStates)
	device.on("temperature-changed", updateTemperature)
})

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