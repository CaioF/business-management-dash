import { Contact } from '../../../core/mark_contacted/entities/contact'
import { MarkContactedResponse } from '../../../core/mark_contacted/entities/response'
import { sql } from '../../adapters/postgres'

class PostgresMarker {
    async markContacted(
        contact: Contact,
        errorHandler: (res: MarkContactedResponse) => any,
        responseHandler: (res: MarkContactedResponse) => any
    ) {
        const query = getAsyncAuth(contact, errorHandler)

        query.then((res) => {
            if (res.length == 0) {
                const resp = new MarkContactedResponse(
                    false,
                    ["Business not found"],
                    0
                )

                responseHandler(resp)
                return
            }

            if (res[0].errorHandled) {
                return
            }

            const id = res[0].id
            const resp = new MarkContactedResponse(true, [], id as number)
            responseHandler(resp)
        })

        return query
    }
}

async function getAsyncAuth(
    contact: Contact,
    errorHandler: (res: MarkContactedResponse) => any,
) {
    try {
        return await sql`
            UPDATE
                businesses
            SET
                contacted_at = NOW() AT TIME ZONE 'UTC', contacted_by = ${contact.userId}
            WHERE
                id = ${contact.businessId}
            RETURNING id`
    } catch (error) {
        const resp = new MarkContactedResponse(
            false,
            ["User not found"],
            0
        )

        errorHandler(resp)
        return [{id: 0, errorHandled: true}]
    }
}

export { PostgresMarker }
