Map.prototype.getKeyFor = function(value) {
    for (const [k, v] of this.entries()) {
        if (v === value) {
            return k
        }
    }
}