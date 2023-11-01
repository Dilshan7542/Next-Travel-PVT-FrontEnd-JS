export class Customer{
    get customerID() {
        return this._customerID;
    }

    get nic() {
        return this._nic;
    }

    get name() {
        return this._name;
    }

    get address() {
        return this._address;
    }

    get email() {
        return this._email;
    }

    get pwd() {
        return this._pwd;
    }

    get image() {
        return this._image;
    }
    constructor(customerID,nic,name,address,email,pwd,image) {

        this._customerID = customerID;
        this._nic = nic;
        this._name = name;
        this._address = address;
        this._email = email;
        this._pwd = pwd;
        this._image = image;
    }
    toJSON(){
        return {
            customerID:this._customerID,
            nic:this._nic,
            name:this._name,
            address:this._address,
            email:this._email,
            pwd:this._pwd,
            image:this._image
        }
    }



}