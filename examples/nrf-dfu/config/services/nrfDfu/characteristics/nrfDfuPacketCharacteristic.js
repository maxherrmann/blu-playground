const { logger, Characteristic } = blu

export default class NrfDfuPacketCharacteristic extends Characteristic {
	sendData(data) {
        logger.debug(`Send ${data.length} bytes of data.`, this)

        return this.write(data, true)
    }
}