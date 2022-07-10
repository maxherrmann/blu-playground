const { logger, Service } = blu

export default class ButtonService extends Service {
	async onceReady() {
		this.buttonAStateCharacteristic.on(
			"button-state-changed",
			buttonState => {
				this.#emitButtonStatesChangedEvent()
				this.#emitButtonPressedEvent("A", buttonState)
			}
		)

		this.buttonBStateCharacteristic.on(
			"button-state-changed",
			buttonState => {
				this.#emitButtonStatesChangedEvent()
				this.#emitButtonPressedEvent("B", buttonState)
			}
		)
	}

	get buttonStates() {
		return {
			a: this.buttonAStateCharacteristic.buttonState,
			b: this.buttonBStateCharacteristic.buttonState
		}
	}

	#emitButtonStatesChangedEvent() {
		this.device.emit("button-states-changed", this.device.buttonStates)

		logger.debug(
			`Button states changed to `+
			`A = ${this.device.buttonStates.a}, ` +
			`B = ${this.device.buttonStates.b}.`,
			this.device
		)
	}

	#emitButtonPressedEvent(buttonName, buttonState) {
		if (buttonState !== 1) {
			return
		}

		this.device.emit(`button-${buttonName.toLowerCase()}-pressed`)

		logger.log(
			`Button ${buttonName} pressed.`,
			this.device
		)
	}
}