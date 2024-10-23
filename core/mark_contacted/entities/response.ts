class MarkContactedResponse {
    ok: boolean
    errors: Array<string>
    businessId: number

    constructor(ok: boolean, errors: Array<string>, businessId: number) {
        this.ok = ok
        this.errors = errors
        this.businessId = businessId
    }
}

export { MarkContactedResponse }