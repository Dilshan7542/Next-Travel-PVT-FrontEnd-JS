export class Hotel{

    constructor(hotelID,name,email,location,map,tel,image,starRate,hotelOption) {
        this._hotelID = hotelID;
        this._name = name;
        this._email = email;
        this._location = location;
        this._map = map;
        this._tel = tel;
        this._image = image;
        this._starRate = starRate;
        this._hotelOption = hotelOption;
    }

    get hotelID() {
        return this._hotelID;
    }

    set hotelID(value) {
        this._hotelID = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get location() {
        return this._location;
    }

    set location(value) {
        this._location = value;
    }

    get map() {
        return this._map;
    }

    set map(value) {
        this._map = value;
    }

    get tel() {
        return this._tel;
    }

    set tel(value) {
        this._tel = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get starRate() {
        return this._starRate;
    }

    set starRate(value) {
        this._starRate = value;
    }

    get hotelOption() {
        return this._hotelOption;
    }

    set hotelOption(value) {
        this._hotelOption = value;
    }
    toJSON(){
        return {
            hotelID: this._hotelID,
            name: this._name,
            email: this._email,
            location: this._location,
            map: this._map,
            tel: this._tel,
            image: this._image,
            starRate: this._starRate,
            hotelOption: this._hotelOption
        }
    }
}
