const { Service, BluError } = blu

import { FirmwareFile } from "../../../utils/firmwareFile.js"
import FirmwareUpdate from "../../../utils/firmwareUpdate.js"
import isValidFirmwareFile from "../../../utils/isValidFirmwareFile.js"

export default class NrfDfuService extends Service {
	firmwareUpdateInProgress = false

	updateFirmware(firmwareFile) {
        return new Promise(async (resolve, reject) => {
            if (this.firmwareUpdateInProgress) {
                reject(
                    new NrfDfuServiceOperationError(
                        `A firmware update is already in progress.`
                    )
                )

                return
            }

            if (!(firmwareFile instanceof File)) {
                reject(
                    new NrfDfuServiceOperationError(
                        `Argument "firmwareFile" must be an instance of "File".`
                    )
                )

                return
            }

            if (!isValidFirmwareFile(firmwareFile)) {
                reject(
                    new NrfDfuServiceOperationError(
                        `The provided firmware file does not match the ` +
                        `given naming or type conventions.`
                    )
                )

                return
            }

            let firmwareUpdate = new FirmwareUpdate(
                this,
                new FirmwareFile(firmwareFile)
            )

            this.firmwareUpdateInProgress = true

            try {
                await firmwareUpdate.run()

                resolve()
            }
            catch(error) {
                reject(error)
            }

            this.firmwareUpdateInProgress = false
        })
    }
}

class NrfDfuServiceOperationError extends BluError {}