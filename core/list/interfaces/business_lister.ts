import { Filter } from "../entities/filter";
import { ListResponse } from "../entities/response";

interface BusinessLister {
    list(filter: Filter, responseHandler: (a: ListResponse) => any)
}

export { BusinessLister }