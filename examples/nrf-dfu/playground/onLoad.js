import scannerConfig from "../config/scannerConfig.js"
import Device from "../config/device.js"

import "../extensions/Map+getKeyFor.js"

export default () => {
	blu.configuration.use(
		scannerConfig,
		Device
	)
}