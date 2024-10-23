import { User } from './user'

class LoginRequest {
    user: User

    constructor(user: User) {
        this.user = user
    }
}

export { LoginRequest }