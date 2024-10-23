class Contact {
    userId: number
    businessId: number

    constructor(userId: number, businessId: number) {
        this.userId = userId
        this.businessId = businessId
    }

    isValid(): {ok: boolean, errors: Array<string>} {
        var errors = Array<string>()

        if (typeof(this.userId) == "undefined") {
            errors.push("User ID cannot be empty")
        }

        if (typeof(this.userId) != "number") {
            errors.push("User ID must be a number")
        }

        if (typeof(this.businessId) == "undefined") {
            errors.push("Business ID cannot be empty")
        }

        if (typeof(this.businessId) != "number") {
            errors.push("Business ID must be a number")
        }

        const ok = errors.length == 0
        return {ok: ok, errors: errors}
    }
}

export { Contact }