import { Contact } from "../../../core/mark_contacted/entities/contact"
import { MarkContactedResponse } from "../../../core/mark_contacted/entities/response"

class StubMarker {
    ok: boolean
    errors: Array<string>
    id: number

    constructor(ok: boolean, errors: Array<string>, id: number) {
        this.ok = ok
        this.errors = errors
        this.id = id
    }

    async markContacted(
        contact: Contact,
        errorHandler: (res: MarkContactedResponse) => any,
        responseHandler: (res: MarkContactedResponse) => any
    ) {
        const resp = new MarkContactedResponse(this.ok, this.errors, this.id)

        if (this.errors.length == 0) {
            responseHandler(resp)
        } else {
            errorHandler(resp)
        }
    }
}

export { StubMarker }