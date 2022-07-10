const { logger, BluError } = blu

import { FirmwareDataTypes } from "./firmwareFile.js"

import ArraySlicer from "./arraySlicer.js"
import delay from "./delay.js"

export default class FirmwareUpdate {
    state = State.Initializing

    #device
    #controlPointCharacteristic
    #packetCharacteristic
    #firmwareFile
    #progress = 0
    #sentBytes = 0

    constructor(dfuService, firmwareFile) {
        this.#device = dfuService.device
        this.#controlPointCharacteristic = dfuService.nrfDfuControlPointCharacteristic
        this.#packetCharacteristic = dfuService.nrfDfuPacketCharacteristic
        this.#firmwareFile = firmwareFile
    }

    run() {
        return new Promise(async (resolve, reject) => {
            try {
                logger.log("Started.", this)
                this.#device.emit("firmware-update-started")

                let startTime = Date.now()

                this.#initialize()

                await this.#readFirmwareFile()
                await this.#sendInitPacket()
                await this.#sendFirmwareImage()

                this.#handleDisconnect()

                this.#uninitialize()

                this.state = State.Finished

                let endTime = Date.now()
                let duration = (endTime - startTime) / 1000

                logger.log(`Finished. (Duration: ${duration}s)`, this)
                this.#device.emit("firmware-update-finished")

                resolve()
            }
            catch(error) {
                this.#abort()

                logger.error(`Failed. (${error})`, this)
                this.#device.emit("firmware-update-failed", error)

                reject(new FirmwareUpdateError("An error occurred.", error))
            }
        })
    }

    #initialize() {
        this.state = State.Initializing

        this.#controlPointCharacteristic.on("error", error => {
            throw error
        })
    }

    #uninitialize() {
        this.#controlPointCharacteristic.removeAllListeners("error")
    }

    #abort() {
        this.#uninitialize()

        this.state = State.Aborted
    }

    async #readFirmwareFile() {
        this.state = State.ReadingFirmwareFile

        try {
            await this.#firmwareFile.read()
        }
        catch(error) {
            throw new FirmwareFileError("Cannot read firmware file data.", error)
        }
    }

    async #sendInitPacket() {
        this.state = State.SendingInitPacket

        let initPacketDataType = FirmwareDataTypes.get("INIT_PACKET")

        await this.#controlPointCharacteristic.sendHeader(
            this.#firmwareFile.initPacketDataSlicer.array,
            initPacketDataType
        )

        while (this.#firmwareFile.initPacketDataSlicer.hasMoreSlices()) {
            await this.#sendData(this.#firmwareFile.initPacketDataSlicer.nextSlice())
            await delay(initPacketDataType.chunkSendInterval)
        }

        if (CALCULATE_CHECKSUMS) {
            await this.#controlPointCharacteristic.calculateChecksum()
        }

        await this.#controlPointCharacteristic.execute()
    }

    async #sendFirmwareImage() {
        this.state = State.SendingFirmwareImage

        let firmwareImageDataType = FirmwareDataTypes.get("FIRMWARE_IMAGE")

        while (this.#firmwareFile.firmwareImageDataSlicer.hasMoreSlices()) {
            await this.#sendFirmwareObject(this.#firmwareFile.firmwareImageDataSlicer.nextSlice())
            await delay(firmwareImageDataType.chunkSendInterval)
        }
    }

    async #sendFirmwareObject(firmwareObject) {
        let firmwareObjectDataType = FirmwareDataTypes.get("FIRMWARE_OBJECT")

        let firmwareObjectDataSlicer = new ArraySlicer(
            firmwareObject, firmwareObjectDataType.chunkSize
        )

        await this.#controlPointCharacteristic.sendHeader(
            firmwareObjectDataSlicer.array,
            firmwareObjectDataType
        )

        while (firmwareObjectDataSlicer.hasMoreSlices()) {
            await this.#sendData(firmwareObjectDataSlicer.nextSlice())
            await delay(firmwareObjectDataType.chunkSendInterval)
        }

        if (CALCULATE_CHECKSUMS) {
            await this.#controlPointCharacteristic.calculateChecksum()
        }

        await this.#controlPointCharacteristic.execute()
    }

    async #sendData(data) {
        await this.#packetCharacteristic.sendData(data)

        this.#sentBytes += data.length

        let progress = Math.round(this.#sentBytes * 100 / this.#firmwareFile.totalBytes)

        if (progress > this.#progress) {
            this.#progress = progress

            logger.debug(`Progress: ${this.#progress}%.`, this)
            this.#device.emit("firmware-update-progress", this.#progress)
        }
    }

    async #handleDisconnect() {
        this.#device.muteChannel("connection-lost")
        await delay(3000)
    }
}

const CALCULATE_CHECKSUMS = true

const State = {
    Ready: "Ready",
    Initializing: "Initializing",
    ReadingFirmwareFile: "ReadingFirmwareFile",
    SendingInitPacket: "SendingInitPacket",
    SendingFirmwareImage: "SendingFirmwareImage",
    Finished: "Finished",
    Aborted: "Aborted"
}

class FirmwareFileError extends BluError {}
class FirmwareUpdateError extends BluError {}