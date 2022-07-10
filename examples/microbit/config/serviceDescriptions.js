const {
	ServiceDescription,
	CharacteristicDescription
} = blu

import ButtonService from "./services/button/buttonService.js"
import ButtonAStateCharacteristic from "./services/button/characteristics/buttonAStateCharacteristic.js"
import ButtonBStateCharacteristic from "./services/button/characteristics/buttonBStateCharacteristic.js"

import TemperatureService from "./services/temperature/temperatureService.js"
import TemperatureCharacteristic from "./services/temperature/characteristics/temperatureCharacteristic.js"
import TemperaturePeriodCharacteristic from "./services/temperature/characteristics/temperaturePeriodCharacteristic.js"

export default [
	new ServiceDescription(
		"Button Service",
		"buttonService",
		ButtonService,
		"e95d9882-251d-470a-a062-fa1922dfa9a8",
		[
			new CharacteristicDescription(
				"Button A State Characteristic",
				"buttonAStateCharacteristic",
				ButtonAStateCharacteristic,
				"e95dda90-251d-470a-a062-fa1922dfa9a8",
				[],
				"R--N"
			),
			new CharacteristicDescription(
				"Button B State Characteristic",
				"buttonBStateCharacteristic",
				ButtonBStateCharacteristic,
				"e95dda91-251d-470a-a062-fa1922dfa9a8",
				[],
				"R--N"
			)
		]
	),
	new ServiceDescription(
		"Temperature Service",
		"temperatureService",
		TemperatureService,
		"e95d6100-251d-470a-a062-fa1922dfa9a8",
		[
			new CharacteristicDescription(
				"Temperature Characteristic",
				"temperatureCharacteristic",
				TemperatureCharacteristic,
				"e95d9250-251d-470a-a062-fa1922dfa9a8",
				[],
				"R--N"
			),
			new CharacteristicDescription(
				"Temperature Period Characteristic",
				"temperaturePeriodCharacteristic",
				TemperaturePeriodCharacteristic,
				"e95d1b25-251d-470a-a062-fa1922dfa9a8",
				[],
				"RW--"
			)
		]
	)
]