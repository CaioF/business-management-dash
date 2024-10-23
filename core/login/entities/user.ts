class User {
    email: string
    password: string

    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }

    isValid(): {is: boolean, errors: Array<string>} {
        var errors = Array<string>()
        if (typeof(this.email) == 'undefined' || this.email.length == 0) {
            errors.push("E-mail cannot be empty")
        } else {
            if (!this.email.includes('@')) {
                errors.push("Invalid e-mail, missing @")
            }

            if (!this.email.includes('.')) {
                errors.push("Invalid e-mail, missing dot")
            }
        }

        if (typeof(this.password) == 'undefined' || this.password.length == 0) {
            errors.push("Password cannot be empty")
        } else if (this.password.length < 3) {
            errors.push("Password is too short")
        }

        const is = (errors.length == 0)
        return {is, errors}
    }
}

export {User}