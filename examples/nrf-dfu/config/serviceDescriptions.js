const {
	ServiceDescription,
	CharacteristicDescription
} = blu

import NrfDfuService from "./services/nrfDfu/nrfDfuService.js"
import NrfDfuControlPointCharacteristic from "./services/nrfDfu/characteristics/nrfDfuControlPointCharacteristic.js"
import NrfDfuPacketCharacteristic from "./services/nrfDfu/characteristics/nrfDfuPacketCharacteristic.js"

export default [
	new ServiceDescription(
		"nRF DFU Service",
		"nrfDfuService",
		NrfDfuService,
		0xFE59,
		[
			new CharacteristicDescription(
				"nRF DFU Control Point Characteristic",
				"nrfDfuControlPointCharacteristic",
				NrfDfuControlPointCharacteristic,
				"8ec90001-f315-4f60-9fb8-838830daea50",
				[],
				"-W-N"
			),
			new CharacteristicDescription(
				"nRF DFU Packet Characteristic",
				"nrfDfuPacketCharacteristic",
				NrfDfuPacketCharacteristic,
				"8ec90002-f315-4f60-9fb8-838830daea50",
				[],
				"--w-"
			)
		],
		true
	)
]