const { Characteristic, Response } = blu

export default class ButtonStateCharacteristic extends Characteristic {
	responseType = ButtonStateResponse

	#buttonState = null

	async onceReady() {
		this.#buttonState = await this.read("buttonState")

		this.on("notification", response => {
			this.#buttonState = response.buttonState
			this.emit("button-state-changed", this.buttonState)
        })
	}

	get buttonState() {
		return this.#buttonState
	}
}

class ButtonStateResponse extends Response {
	get buttonState() {
		return this.data.getUint8(0)
	}
}