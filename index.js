import blu from "https://cdn.jsdelivr.net/gh/maxherrmann/blu@latest/dist/blu.esm.min.js"

import examples from "./examples/examples.js"

window.blu = blu

if (!blu.bluetooth.isSupported) {
	document.querySelector(".content").style.display = "none"
	document.querySelector("#bluetooth-not-supported-overlay").style.display = "block"
}

let exampleSelect = document.querySelector("#example")
let exampleDescription = document.querySelector("#example-description")
let exampleControls = document.querySelector("#example-controls")
let bluetoothDataTransferLoggingToggle = document.querySelector("#bluetooth-data-transfer-logging")
let versionLink = document.querySelector("#blu-version")

bluetoothDataTransferLoggingToggle.checked = blu.bluetooth.isDataTransferLoggingEnabled

versionLink.setAttribute("href", versionLink.getAttribute("href") + blu.version)
versionLink.innerHTML = blu.version

let connectDeviceButton = document.querySelector("#connect-device")

connectDeviceButton.addEventListener("click", async () => {
	connectDeviceButton.setAttribute("disabled", true)

	blu.logger.debug("Waiting for device selection …", "Playground")

	let device = await blu.scanner.getDevice()

	if (device) {
		onDeviceScanned(device)
		.catch(error => {
			console.error(error)
		})
	}
	else {
		blu.logger.debug("No device selected.", "Playground")

		connectDeviceButton.removeAttribute("disabled")
	}
})

bluetoothDataTransferLoggingToggle.addEventListener("change", event => {
	event.target.checked ?
	window.blu.bluetooth.enableDataTransferLogging() :
	window.blu.bluetooth.disableDataTransferLogging()
})

setCollectionVisibility("connection", false)
populateExampleSelect()

async function populateExampleSelect() {
	for (const example of examples) {
		let exampleConfig = await import(`./examples/${example}/example.js`)

		exampleSelect.innerHTML += `
			<option
				value="${example}"
				data-description="${exampleConfig.default.description}"
			>${exampleConfig.default.name}</option>
		`
	}

	exampleSelect.addEventListener("change", async event => {
		let exampleId = event.target.value
		let exampleOption = exampleSelect.querySelector(
			`option[value="${exampleId}"]`
		)
		let exampleOnLoadModule = await import(`./examples/${exampleId}/playground/onLoad.js`)
		let exampleOnLoad = exampleOnLoadModule.default
		let exampleHtmlResponse = await fetch(`./examples/${exampleId}/playground/index.html`)
		let exampleHtml = await exampleHtmlResponse.text()

		exampleDescription.innerHTML = exampleOption.getAttribute("data-description")
		exampleControls.innerHTML = exampleHtml
		await loadScript(document.body, `./examples/${exampleId}/playground/index.js`)

		exampleOnLoad()
	})

	exampleSelect.value = "starter-kit"
	exampleSelect.dispatchEvent(new Event("change"))
}

async function onDeviceScanned(device) {
	return new Promise(async (resolve, reject) => {
		try {
			blu.logger.log(`Connecting ${device.constructor.name} …`, "Playground")

			exampleSelect.setAttribute("disabled", true)

			await device.connect()

			window.device = device

			let nameNode = document.querySelector("#device-name")
			let identifierNode = document.querySelector("#device-identifier")
			let servicesNode = document.querySelector("#device-services")
			let characteristicsNode = document.querySelector("#device-characteristics")

			let disconnectDeviceButton = document.querySelector("#disconnect-device")

			nameNode.innerHTML = device.name
			identifierNode.innerHTML = `<code>${device.id}</code>`

			if (device.services.length > 0) {
				servicesNode.innerHTML = device.services.map(service =>
					service.description?.name ?? "Unknown"
				).join("<br>")
			}

			if (device.characteristics.length > 0) {
				characteristicsNode.innerHTML = device.characteristics.map(characteristic =>
					`<code class="${(characteristic.hasExpectedProperties ?? false) ? "green" : "red"}">` +
					`${characteristic.properties.string}</code> ${characteristic.description?.name ?? "Unknown"}`
				).join("<br>")
			}

			device.once("disconnected", () => {
				setCollectionVisibility("connection", false)

				// Account for browser disconnect delay.
				// Could be removed, but reconnecting right away leads to errors.
				setTimeout(() => {
					connectDeviceButton.removeAttribute("disabled")
					exampleSelect.removeAttribute("disabled")
				}, 2500)
			})

			disconnectDeviceButton.onclick = async () => {
				disconnectDeviceButton.setAttribute("disabled", true)

				device.disconnect()
				.catch(error => {
					console.error(error)
				})
				.finally(() => {
					disconnectDeviceButton.removeAttribute("disabled")
				})
			}

			setCollectionVisibility("connection", true)

			resolve()
		}
		catch(error) {
			if (device.isConnected) {
				await device.disconnect()
			}

			connectDeviceButton.removeAttribute("disabled")
			exampleSelect.removeAttribute("disabled")

			reject(error)
		}
	})
}

function setCollectionVisibility(collection, isVisible) {
	let elements = document.querySelectorAll(`[${collection}]`)

	for (const element of elements) {
		if (isVisible) {
			element.style.display = "revert"
		}
		else {
			element.style.display = "none"
		}

		element.setAttribute(collection, isVisible)
	}
}

function loadScript(target, filePath) {
	return new Promise(resolve => {
        filePath = filePath.replaceAll(/\\\/|\\/g, '/')

        let existingFile = target.querySelector(`script[src="${filePath}"]`)

        if (existingFile) {
            resolve()
        }

        let script = document.createElement('script')
        script.type = 'module'
        script.src = filePath
        script.onload = resolve

        target.append(script)
    })
}