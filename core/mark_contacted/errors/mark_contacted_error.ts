import { ErrorCode } from './error_codes'

class MarkContactedError extends Error {
    code: ErrorCode
    previous: Error

    constructor(code: ErrorCode, message: string, previous: Error) {
        super(message)
        this.code = code
        this.previous = previous
    }
}

export { MarkContactedError }