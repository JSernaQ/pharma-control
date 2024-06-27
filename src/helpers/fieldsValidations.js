class fieldValidation {
    
    negativeValidation(num) {
        if (num<0) {
            return false
        }
        return true
    }

}

module.exports = { fieldValidation }