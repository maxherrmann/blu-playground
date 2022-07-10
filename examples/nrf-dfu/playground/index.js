const fileInputNode = document.querySelector("#file-input")
const fileNameNode = document.querySelector("#file-name")
const startDfuButton = document.querySelector("#start-dfu")

startDfuButton.setAttribute("disabled", "")

fileInputNode.addEventListener("change", event => {
    window.file = event.target.files[0]

    fileNameNode.innerHTML = file?.name ?? "No file selected."

	startDfuButton.toggleAttribute("disabled", !file?.name)
})

startDfuButton.addEventListener("click", () => {
	startDfuButton.setAttribute("disabled", "")

	device.updateFirmware(file)
	.finally(() => {
		startDfuButton.removeAttribute("disabled")
	})
})