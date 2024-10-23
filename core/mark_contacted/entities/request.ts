import { Contact } from "./contact"

class MarkContactedRequest {
    contact: Contact

    constructor(contact: Contact) {
        this.contact = contact
    }
}

export { MarkContactedRequest }