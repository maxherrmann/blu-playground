const {
	ServiceDescription,
	CharacteristicDescription
} = blu

import BatteryService from "./services/battery/batteryService.js"
import BatteryLevelCharacteristic from "./services/battery/characteristics/batteryLevelCharacteristic.js"

export default [
	new ServiceDescription(
		"Battery Service",
		"batteryService",
		BatteryService,
		0x180F,
		[
			new CharacteristicDescription(
				"Battery Level Characteristic",
				"batteryLevelCharacteristic",
				BatteryLevelCharacteristic,
				0x2A19,
				[],
				"R--N"
			)
		]
	)
]