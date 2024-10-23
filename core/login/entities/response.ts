class LoginResponse {
    ok: boolean
    errors: Array<string>

    constructor(ok: boolean, errors: Array<string>) {
        this.ok = ok
        this.errors = errors
    }
}

export { LoginResponse }