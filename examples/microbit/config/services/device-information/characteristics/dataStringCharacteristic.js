const { Characteristic, Response } = blu

import dataConverter from "../../../../utils/dataConverter.js"

export default class DataStringCharacteristic extends Characteristic {
	responseType = DataStringResponse

	#dataString = null

	async onceReady() {
		await this.#readDataString()
	}

	get dataString() {
		return this.#dataString
	}

	async #readDataString() {
		this.#dataString = await this.read("dataString")
	}
}

class DataStringResponse extends Response {
	get dataString() {
		return dataConverter.arrayBufferToString(this.data)
	}
}