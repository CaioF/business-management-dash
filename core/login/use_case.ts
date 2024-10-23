import { Authenticator } from './interfaces/authenticator'
import { LoginRequest } from './entities/request'
import { LoginResponse } from './entities/response'
import { ErrorCode } from './errors/error_codes'
import { AuthError } from './errors/auth_error'

class LoginUseCase {
    auth: Authenticator

    constructor(auth: Authenticator) {
        this.auth = auth
    }

    execute(
        req: LoginRequest,
        errorHandler: (res: LoginResponse) => any,
        responseHandler: (res: LoginResponse) => any
    ) {
        try {
            const {is, errors} = req.user.isValid()
            if (!is) {
                errorHandler(new LoginResponse(is, errors))
                return
            }

            this.auth.authenticate(req.user, responseHandler)
        } catch (error) {
            throw new AuthError(
                ErrorCode.Unknown,
                'Error while trying to authenticate',
                error
            )
        }
    }
}

export { LoginUseCase }
