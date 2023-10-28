export class Login{

    constructor(email,pwd) {
        this._email = email;
        this._pwd = pwd;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get pwd() {
        return this._pwd;
    }

    set pwd(value) {
        this._pwd = value;
    }
}