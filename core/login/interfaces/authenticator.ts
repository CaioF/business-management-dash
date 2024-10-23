import { LoginResponse } from '../entities/response'
import { User } from '../entities/user'

interface Authenticator{
    authenticate(user: User, returnCallBack: (res: LoginResponse) => any): any
}

export { Authenticator }