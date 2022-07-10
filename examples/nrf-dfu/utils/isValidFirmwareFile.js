export default function isValidFirmwareFile(file) {
    let fileNameIsValid = file.name.endsWith(".zip")
    let fileTypeIsValid = file.type === "application/x-zip-compressed"

    return fileNameIsValid && fileTypeIsValid
}