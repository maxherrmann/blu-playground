const { Service } = blu

export default class DeviceInformationService extends Service {
	get modelNumber() {
		return this.modelNumberCharacteristic?.dataString
	}

	get serialNumber() {
		return this.serialNumberCharacteristic?.dataString
	}

	get hardwareRevision() {
		return this.hardwareRevisionCharacteristic?.dataString
	}

	get firmwareRevision() {
		return this.firmwareRevisionCharacteristic?.dataString
	}

	get manufacturerName() {
		return this.manufacturerNameCharacteristic?.dataString
	}
}