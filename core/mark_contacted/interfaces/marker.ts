import { Contact } from "../entities/contact"
import { MarkContactedResponse } from "../entities/response"

interface Marker{
    markContacted(
        contact: Contact,
        errorHandler: (res: MarkContactedResponse) => any,
        responseHandler: (res: MarkContactedResponse) => any
    ): any
}

export { Marker }