const {
	logger,
	Characteristic,
	Request,
	Response,
	BluError
} = blu

import { FirmwareDataTypes } from "../../../../utils/firmwareFile.js"

export default class NrfDfuControlPointCharacteristic extends Characteristic {
	responseType = NrfDfuControlPointResponse

    async onceReady() {
        this.on("notification", response => {
            logger.debug(
                `Control point response with result "${response.result}" ` +
                `received for command "${response.command}".`,
                this
            )

            if (!response.isValid) {
                this.emit("error",
                    new DfuControlError(
                        `Control point response with invalid response code ` +
                        `("${response.code}") received for command "${response.command}".`
                    )
                )

                return
            }

            switch (response.result) {
                case "SUCCESS":
                    break
                default:
                    this.emit("error",
                        new DfuControlError(
                            `Control point response with error "${response.result}" ` +
                            `received for command "${response.command}".`
                        )
                    )
                    break
            }
        })
    }

    sendHeader(firmwareObjectData, firmwareDataType) {
        logger.debug(`Send "${FirmwareDataTypes.getKeyFor(firmwareDataType)}" header.`, this)

        return this.request(
            new SendHeaderDataRequest(
                new HeaderData(firmwareObjectData, firmwareDataType)
            )
        )
    }

    calculateChecksum() {
        logger.debug("Calculate checksum.", this)

        return this.request(new CalculateChecksumRequest())
    }

    execute() {
        logger.debug("Execute.", this)

        return this.request(new ExecuteRequest())
    }
}

export const Commands = new Map([
    // See: https://infocenter.nordicsemi.com/topic/com.nordic.infocenter.sdk5.v15.0.0/group__sdk__nrf__dfu__req__handler.html#ga3ba70c9f7cf5a1e3b34df7fad58d5eea

    ["CREATE", 0x01],
    ["SET_PACKET_RECEIPT_NOTIFICATION_VALUE", 0x02],
    ["CALCULATE_CHECKSUM", 0x03],
    ["EXECUTE", 0x04],
    ["SELECT", 0x06]
])

export const Results = new Map([
    // See: https://infocenter.nordicsemi.com/topic/com.nordic.infocenter.sdk5.v15.0.0/group__sdk__nrf__dfu__req__handler.html#ga654d8446f2996253016f7c7713124094

    ["SUCCESS", 0x01],

    ["ERROR_INVALID_COMMAND", 0x00],
    ["ERROR_COMMAND_NOT_SUPPORTED", 0x02],
    ["ERROR_INVALID_PARAMETER", 0x03],
    ["ERROR_INSUFFICIENT_RESOURCES", 0x04],
    ["ERROR_INVALID_OBJECT", 0x05],
    ["ERROR_UNSUPPORTED_TYPE", 0x07],
    ["ERROR_OPERATION_NOT_PERMITTED", 0x08],
    ["ERROR_OPERATION_FAILED", 0x0A],
    ["ERROR_EXTENDED_ERROR", 0x0B]
])

class HeaderData {
    constructor(firmwareObjectData, firmwareFileDataType) {
        let data = new DataView(new ArrayBuffer(6))

        data.setUint8(0, Commands.get("CREATE"))
        data.setUint8(1, firmwareFileDataType.id)
        data.setUint32(2, firmwareObjectData.length, true)

        return data
    }
}

class NrfDfuControlPointResponse extends Response {
    code
    command
    result
    isValid

    constructor(data) {
        super(data)

        this.code = this.data.getUint8(0)
        this.command = Commands.getKeyFor(this.data.getUint8(1))
        this.result = Results.getKeyFor(this.data.getUint8(2))
        this.isValid = this.code === 0x60
    }
}

class SendHeaderDataRequest extends Request {
    responseType = SendHeaderDataResponse

    constructor(headerData) {
        super(headerData)
    }
}

class SendHeaderDataResponse extends NrfDfuControlPointResponse {
    static validatorFunction(response) {
        return response.command === "CREATE"
    }
}

class CalculateChecksumRequest extends Request {
    responseType = CalculateChecksumResponse

    constructor() {
        super(Commands.get("CALCULATE_CHECKSUM"))
    }
}

class CalculateChecksumResponse extends NrfDfuControlPointResponse {
    static validatorFunction(response) {
        return response.command === "CALCULATE_CHECKSUM"
    }
}

class ExecuteRequest extends Request {
    responseType = ExecuteResponse

    constructor() {
        super(Commands.get("EXECUTE"))
    }
}

class ExecuteResponse extends NrfDfuControlPointResponse {
    static validatorFunction(response) {
        return response.command === "EXECUTE"
    }
}

class DfuControlError extends BluError {}