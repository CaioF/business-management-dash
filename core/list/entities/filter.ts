class Filter {
    name: string
    reviewGreaterThan: number
    reviewLessThan: number
    contactedFrom: string
    contactedTo: string
    contactedBy: number
    userId: number
    page: number

    constructor(
        name: string,
        reviewGreaterThan: number,
        reviewLessThan: number,
        contactedFrom: string,
        contactedTo: string,
        contactedBy: number,
        userId: number,
        page: number
    ) {
        this.name = name
        this.reviewGreaterThan = reviewGreaterThan
        this.reviewLessThan = reviewLessThan
        this.contactedFrom = contactedFrom
        this.contactedTo = contactedTo
        this.contactedBy = contactedBy
        this.userId = userId
        this.page = page
    }

    isValid(): {ok: boolean, errors: Array<string>} {
        var errors = Array<string>()

        if (typeof(this.userId) == "undefined") {
            errors.push("User ID cannot be empty")
        }

        if (typeof(this.userId) != "number") {
            errors.push("User ID must be a number")
        }

        if (typeof(this.page) == "undefined") {
            errors.push("Page cannot be empty")
        }

        if (typeof(this.page) != "number") {
            errors.push("Page must be a number")
        }

        if (typeof(this.reviewGreaterThan) != "undefined" && typeof(this.reviewGreaterThan) != "number") {
            errors.push("Minimum of reviews must be a number")
        }

        if (typeof(this.reviewLessThan) != "undefined" && typeof(this.reviewLessThan) != "number") {
            errors.push("Maximum of reviews must be a number")
        }

        if (typeof(this.contactedBy) != "undefined" && typeof(this.contactedBy) != "number") {
            errors.push("Contacted by must be a number")
        }

        if (typeof(this.contactedFrom) != "undefined" && !((new Date(this.contactedFrom)).getTime() > 0)) {
            errors.push("Minimum contact date must be a date")
        }

        if (typeof(this.contactedTo) != "undefined" && !((new Date(this.contactedTo)).getTime() > 0)) {
            errors.push("Maximum contact date must be a date")
        }

        const ok = errors.length == 0
        return {ok: ok, errors: errors}
    }
}

export { Filter }