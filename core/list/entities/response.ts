import { Business } from "./business"

class ListResponse {
    ok: boolean
    errors: Array<string>
    businesses: Array<Business>

    constructor(
        ok: boolean,
        errors: Array<string>,
        businesses: Array<Business>
    ) {
        this.ok = ok
        this.errors = errors
        this.businesses = businesses
    }
}

export { ListResponse }