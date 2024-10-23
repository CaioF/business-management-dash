import { Business } from "./entities/business";
import { ListRequest } from "./entities/request";
import { ListResponse } from "./entities/response";
import { ErrorCode } from "./errors/error_codes";
import { ListError } from "./errors/list_error";
import { BusinessLister } from "./interfaces/business_lister";

class ListUseCase {
    lister: BusinessLister

    constructor(lister: BusinessLister) {
        this.lister = lister
    }

    execute(
        req: ListRequest,
        errorHandler: (a: ListResponse) => any,
        responseHandler: (a: ListResponse) => any
    ) {
        try {
            const {ok, errors} = req.filter.isValid()

            if (!ok) {
                const res = new ListResponse(ok, errors, Array<Business>())
                errorHandler(res)
                return
            }

            this.lister.list(req.filter, responseHandler)
        } catch (error) {
            throw new ListError(
                ErrorCode.Unknown,
                'Error while trying to list businesses',
                error
            )
        }
    }
}

export { ListUseCase }