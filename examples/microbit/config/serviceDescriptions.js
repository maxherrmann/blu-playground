const {
	ServiceDescription,
	CharacteristicDescription
} = blu

import DeviceInformationService from "./services/device-information/deviceInformationService.js"
import ModelNumberCharacteristic from "./services/device-information/characteristics/modelNumberCharacteristic.js"
import SerialNumberCharacteristic from "./services/device-information/characteristics/serialNumberCharacteristic.js"
import HardwareRevisionCharacteristic from "./services/device-information/characteristics/hardwareRevisionCharacteristic.js"
import FirmwareRevisionCharacteristic from "./services/device-information/characteristics/firmwareRevisionCharacteristic.js"
import ManufacturerNameCharacteristic from "./services/device-information/characteristics/manufacturerNameCharacteristic.js"

import ButtonService from "./services/button/buttonService.js"
import ButtonAStateCharacteristic from "./services/button/characteristics/buttonAStateCharacteristic.js"
import ButtonBStateCharacteristic from "./services/button/characteristics/buttonBStateCharacteristic.js"

import TemperatureService from "./services/temperature/temperatureService.js"
import TemperatureCharacteristic from "./services/temperature/characteristics/temperatureCharacteristic.js"
import TemperaturePeriodCharacteristic from "./services/temperature/characteristics/temperaturePeriodCharacteristic.js"

export default [
	new ServiceDescription(
		"Device Information Service",
		"deviceInformationService",
		DeviceInformationService,
		"0000180a-0000-1000-8000-00805f9b34fb",
		[
			new CharacteristicDescription(
				"Model Number Characteristic",
				"modelNumberCharacteristic",
				ModelNumberCharacteristic,
				"00002a24-0000-1000-8000-00805f9b34fb",
				[],
				"R---"
			),
			new CharacteristicDescription(
				"Serial Number Characteristic",
				"serialNumberCharacteristic",
				SerialNumberCharacteristic,
				"00002a25-0000-1000-8000-00805f9b34fb",
				[],
				"R---"
			),
			new CharacteristicDescription(
				"Hardware Revision Characteristic",
				"hardwareRevisionCharacteristic",
				HardwareRevisionCharacteristic,
				"00002a26-0000-1000-8000-00805f9b34fb",
				[],
				"R---"
			),
			new CharacteristicDescription(
				"Firmware Revision Characteristic",
				"firmwareRevisionCharacteristic",
				FirmwareRevisionCharacteristic,
				"00002a27-0000-1000-8000-00805f9b34fb",
				[],
				"R---"
			),
			new CharacteristicDescription(
				"Manufacturer Name Characteristic",
				"manufacturerNameCharacteristic",
				ManufacturerNameCharacteristic,
				"00002a29-0000-1000-8000-00805f9b34fb",
				[],
				"R---"
			)
		]
	),
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