import { MarkContactedRequest } from "./entities/request"
import { MarkContactedResponse } from "./entities/response"
import { ErrorCode } from "./errors/error_codes"
import { MarkContactedError } from "./errors/mark_contacted_error"
import { Marker } from "./interfaces/marker"

class MarkContactedUseCase {
    marker: Marker

    constructor(marker: Marker) {
        this.marker = marker
    }

    execute(
        req: MarkContactedRequest,
        errorHandler: (res: MarkContactedResponse) => any,
        responseHandler: (res: MarkContactedResponse) => any
    ) {
        try {
            const {ok, errors} = req.contact.isValid()

            if (!ok) {
                const res = new MarkContactedResponse(ok, errors, 0)
                errorHandler(res)
                return
            }

            this.marker.markContacted(
                req.contact,
                errorHandler,
                responseHandler
            )
        } catch (error) {
            throw new MarkContactedError(
                ErrorCode.Unknown,
                'Error while trying to mark business as contacted',
                error
            )
        }
    }
}

export { MarkContactedUseCase }
