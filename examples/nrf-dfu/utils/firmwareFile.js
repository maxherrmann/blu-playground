const { BluError } = blu

import "https://cdn.jsdelivr.net/npm/jszip/dist/jszip.min.js"

import ArraySlicer from "./arraySlicer.js"

export class FirmwareFile {
    totalBytes
    initPacketDataSlicer
    firmwareImageDataSlicer

    #file

    constructor(file) {
        this.#file = file
    }

    async read() {
        try {
            let buffer = await this.#file.arrayBuffer()
            let zipFile = await JSZip.loadAsync(buffer)
            let initPacketDataType = FirmwareDataTypes.get("INIT_PACKET")
            let firmwareImageDataType = FirmwareDataTypes.get("FIRMWARE_IMAGE")
            let initPacketFile = await zipFile.file(initPacketDataType.fileNameRegex)[0]
            let firmwareImageFile = await zipFile.file(firmwareImageDataType.fileNameRegex)[0]

            this.initPacketDataSlicer = new ArraySlicer(
                await initPacketFile.async("array"),
                initPacketDataType.chunkSize
            )
            this.firmwareImageDataSlicer = new ArraySlicer(
                await firmwareImageFile.async("array"),
                firmwareImageDataType.chunkSize
            )

            let totalBytes = 0

            let initPacketBytes = this.initPacketDataSlicer.arraySize
            let initPacketHeaderBytes = 6
            totalBytes += initPacketBytes + initPacketHeaderBytes

            let firmwareObjectBytes = this.firmwareImageDataSlicer.arraySize
            let firmwareObjectHeaderBytes = this.firmwareImageDataSlicer.totalSliceCount * 6
            totalBytes += firmwareObjectBytes + firmwareObjectHeaderBytes

            this.totalBytes = totalBytes
        }
        catch(error) {
            throw new FirmwareFileError("Cannot read firmware file data.", error)
        }
    }
}

class FirmwareDataType {
    id
    fileNameRegex
    chunkSize
    chunkSendInterval

    constructor(id, fileNameRegex, chunkSize, chunkSendInterval) {
        this.id = id
        this.fileNameRegex = fileNameRegex
        this.chunkSize = chunkSize
        this.chunkSendInterval = chunkSendInterval
    }
}

export const FirmwareDataTypes = new Map([
    ["INIT_PACKET", new FirmwareDataType(0x01, /^.+\.dat$/, 20, 0)],
    ["FIRMWARE_IMAGE", new FirmwareDataType(undefined, /^.+\.bin$/, 4096, 0)],
    ["FIRMWARE_OBJECT", new FirmwareDataType(0x02, undefined, 20, 0)]
])

class FirmwareFileError extends BluError {}