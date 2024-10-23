import { Business } from '../../../core/list/entities/business'
import { City } from '../../../core/list/entities/city'
import { Filter } from '../../../core/list/entities/filter'
import { ListResponse } from '../../../core/list/entities/response'
import { sql } from '../../adapters/postgres'

class PostgresLister {
    async list(filter: Filter, responseHandler: (a: ListResponse) => any) {
        const query = getAsyncQuery(filter)

        query.then((res) => {
            var businesses = Array<Business>()

            res.forEach((row) => {
                const city = new City(
                    row.city_id,
                    row.city_name,
                    row.city_state
                )

                const business = new Business(
                    row.business_id,
                    row.business_name,
                    city,
                    row.review_count,
                    row.contacted_at,
                    row.contacted_by
                )

                businesses.push(business)
            })

            const listResponse = new ListResponse(true, [], businesses)
            responseHandler(listResponse)
        })

        return query
    }
}

async function getAsyncQuery(filter: Filter) {
    const shouldFilterName = typeof(filter.name) != "undefined" && filter.name.length > 0
    const filterName =  sql`AND b.name ILIKE '%' || ${ filter.name } || '%'`

    const shouldFilterReviewCountGreater = typeof(filter.reviewGreaterThan) != "undefined"
    const filterReviewCountGreater = sql`AND review_count >= ${filter.reviewGreaterThan}`

    const shouldFilterReviewCountLess = typeof(filter.reviewLessThan) != "undefined"
    const filterReviewCountLess = sql`AND review_count <= ${filter.reviewLessThan}`

    const shouldFilterContactedFrom = typeof(filter.contactedFrom) != "undefined"
    const filterContactedFrom = sql`AND contacted_at <= ${filter.contactedFrom}::TIMESTAMP`

    const shouldFilterContactedTo = typeof(filter.contactedTo) != "undefined"
    const filterContactedTo = sql`AND contacted_at >= ${filter.contactedTo}::TIMESTAMP`

    const shouldFilterContactedBy = typeof(filter.contactedBy) != "undefined"
    const filterContactedBy = sql`AND contacted_by = ${filter.contactedBy}`

    const offset = (filter.page - 1) * 10

    const query = await sql`
    WITH city_perms AS (
        SELECT
            DISTINCT(c.id) AS city_id,
            u.id AS user_id
        FROM
            users u
            LEFT JOIN user_city_permissions p ON p.user_id = u.id OR u.user_role = 'ADMIN'
            LEFT JOIN cities c ON p.city_id = c.id OR u.user_role = 'ADMIN'
        WHERE
            u.id = ${filter.userId}
    ) SELECT
        b.id AS business_id,
        b.name AS business_name,
        b.review_count AS review_count,
        (b.contacted_at AT TIME ZONE 'UTC') AT TIME ZONE tz.name AS contacted_at,
        b.contacted_by AS contacted_by,
        c.id AS city_id,
        c.name AS city_name,
        c.state AS city_state
    FROM
        businesses b
        JOIN city_perms p ON b.city_id = p.city_id
        JOIN users u ON u.id = p.user_id
        JOIN cities c ON c.id = b.city_id
        JOIN time_zones tz ON tz.id = u.time_zone
    WHERE
        u.id = ${filter.userId}
        ${shouldFilterName ? filterName : sql``}
        ${shouldFilterReviewCountGreater ? filterReviewCountGreater : sql``}
        ${shouldFilterReviewCountLess ? filterReviewCountLess : sql``}
        ${shouldFilterContactedFrom ? filterContactedFrom : sql``}
        ${shouldFilterContactedTo ? filterContactedTo : sql``}
        ${shouldFilterContactedBy ? filterContactedBy : sql``}
    ORDER BY
        b.name
    LIMIT
        10
    OFFSET
        ${offset}`

    return query
}

export { PostgresLister }
