const { logger, Characteristic, Response } = blu

export default class TemperatureCharacteristic extends Characteristic {
	responseType = TemperatureResponse

	#temperature = null

	async onceReady() {
		this.#temperature = await this.read("temperature")

		this.on("notification", response => {
			if (
                this.#temperature === null ||
                this.#temperature !== response.temperature
            ) {
				this.#temperature = response.temperature

				this.service.device.emit("temperature-changed", this.temperature)

				logger.log(
					`Temperature changed to ${this.temperature} °C.`,
					this.service.device
				)
			}
        })
	}

	get temperature() {
		return this.#temperature
	}
}

class TemperatureResponse extends Response {
	get temperature() {
		return this.data.getInt8(0)
	}
}