const { Service } = blu

export default class BatteryService extends Service {
	get batteryLevel() {
		return this.batteryLevelCharacteristic.batteryLevel
	}
}