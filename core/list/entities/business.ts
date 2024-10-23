import { City } from "./city"

class Business {
    id: number
    name: string
    city: City
    reviewCount: number
    contactedAt: string
    contactedBy: string

    constructor(
        id: number,
        name: string,
        city: City,
        reviewCount: number,
        contactedAt: string,
        contactedBy: string
    ) {
        this.id = id
        this.name = name
        this.city = city
        this.reviewCount = reviewCount
        this.contactedAt = contactedAt
        this.contactedBy = contactedBy
    }
}

export { Business }