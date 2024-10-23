import { Business } from "../../../core/list/entities/business"
import { Filter } from "../../../core/list/entities/filter"
import { ListResponse } from "../../../core/list/entities/response"

class StubLister {
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

    list(filter: Filter, responseHandler: (a: ListResponse) => any) {
        const resp = new ListResponse(this.ok, this.errors, this.businesses)
        responseHandler(resp)
    }
}

export { StubLister }