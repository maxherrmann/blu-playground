const { BluError } = blu

export default class ArraySlicer {
    #array
    #sliceSize
    #currentIndex

    constructor(array, sliceSize = 1) {
        if (!Array.isArray(array)) {
            throw new ArraySlicerError(
                `Argument "array" must be of type "array".`
            )
        }

        if (typeof sliceSize !== "number") {
            throw new ArraySlicerError(
                `Argument "sliceSize" must be of type "number".`
            )
        }

        if (!Number.isInteger(sliceSize) || sliceSize < 1) {
            throw new ArraySlicerError(
                `Argument "sliceSize" must be an integer that is larger than 0.`
            )
        }

        this.#array = array
        this.#sliceSize = sliceSize
        this.#currentIndex = 0
    }

    get array() {
        return this.#array
    }

    get arraySize() {
        return this.#array.length
    }

    get sliceSize() {
        return this.#sliceSize
    }

    get totalSliceCount() {
        return Math.ceil(this.#array.length / this.#sliceSize)
    }

    get currentSliceCount() {
        return this.#currentIndex
    }

    nextSlice() {
        if (!this.hasMoreSlices()) {
            return null
        }

        let startIndex = this.#currentIndex

        this.#currentIndex = Math.min(
            this.#currentIndex + this.#sliceSize,
            this.#array.length
        )

        return this.#array.slice(startIndex, this.#currentIndex);
    }

    hasMoreSlices() {
        return this.#currentIndex < this.#array.length;
    }
}

class ArraySlicerError extends BluError {}