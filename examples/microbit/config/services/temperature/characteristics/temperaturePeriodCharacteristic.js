const { logger, Characteristic, Response, BluError } = blu

export default class TemperaturePeriodCharacteristic extends Characteristic {
	responseType = TemperaturePeriodResponse

	#temperaturePeriod = null

	async onceReady() {
		await this.#readTemperaturePeriod()
	}

	get temperaturePeriod() {
		return this.#temperaturePeriod
	}

	setTemperaturePeriod(time) {
		return new Promise(async (resolve, reject) => {
			try {
				if (typeof time !== "number") {
					reject(
						new TemperaturePeriodCharacteristicOperationError(
							`Argument "time" must be of type "number".`
						)
					)

					return
				}

				if (time < 0 || time > 65535) {
					reject(
						new TemperaturePeriodCharacteristicOperationError(
							`Argument "time" must be an UInt16 value.`
						)
					)

					return
				}

				await this.write(new Uint16Array([time]))

				logger.debug(
					`Set temperature period to ${time} ms.`,
					this.service.device
				)

				await this.#readTemperaturePeriod()

				resolve()
			}
			catch(error) {
				reject(
                    new TemperaturePeriodCharacteristicOperationError(
                        `Could not set temperature period.`,
                        error
                    )
                )
			}
		})
	}

	async #readTemperaturePeriod() {
		this.#temperaturePeriod = await this.read("temperaturePeriod")
	}
}

class TemperaturePeriodResponse extends Response {
	get temperaturePeriod() {
		return this.data.getUint16(0, true)
	}
}

class TemperaturePeriodCharacteristicOperationError extends BluError {}