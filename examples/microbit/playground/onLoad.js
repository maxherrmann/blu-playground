import scannerConfig from "../config/scannerConfig.js"
import Device from "../config/device.js"

export default () => {
	blu.configuration.use(
		scannerConfig,
		Device
	)
}