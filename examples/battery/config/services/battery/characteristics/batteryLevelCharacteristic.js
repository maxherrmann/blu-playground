const { logger, Characteristic, Response } = blu

export default class BatteryLevelCharacteristic extends Characteristic {
	responseType = BatteryLevelResponse

	#batteryLevel = null

	async onceReady() {
		this.#batteryLevel = await this.read("batteryLevel")

		this.on("notification", response => {
            if (
                this.#batteryLevel === null ||
                this.#batteryLevel !== response.batteryLevel
            ) {
                this.#batteryLevel = response.batteryLevel

				this.service.device.emit(
					"battery-level-changed",
					this.service.device.batteryLevel
				)

				logger.log(
					`Battery level changed to ${this.service.device.batteryLevel}%.`,
					this.service.device
				)
            }
        })
	}

	get batteryLevel() {
		return this.#batteryLevel
	}
}

class BatteryLevelResponse extends Response {
	get batteryLevel() {
		return this.data.getUint8(0)
	}
}