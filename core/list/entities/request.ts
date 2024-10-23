import { Filter } from "./filter"

class ListRequest {
    filter: Filter

    constructor(filter: Filter) {
        this.filter = filter
    }
}

export { ListRequest }