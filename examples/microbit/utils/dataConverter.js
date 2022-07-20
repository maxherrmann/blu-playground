const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

class DataConverter {
    stringToArrayBuffer(string) {
        return textEncoder.encode(string)
    }

    arrayBufferToString(arrayBuffer) {
        return textDecoder.decode(arrayBuffer)
    }
}

export default new DataConverter()