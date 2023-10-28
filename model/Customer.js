export class Customer{
    constructor(customerID,nic,name,address,email,pwd,image) {

        this._customerID = customerID;
        this._nic = nic;
        this._name = name;
        this._address = address;
        this._email = email;
        this._pwd = pwd;
        this._image = image;
    }


    get customerID() {
        return this._customerID;
    }

    set customerID(value) {
        this._customerID = value;
    }

    get nic() {
        return this._nic;
    }

    set nic(value) {
        this._nic = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
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

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }
}