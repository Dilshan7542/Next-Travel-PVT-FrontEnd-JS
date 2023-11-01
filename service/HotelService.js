import {Repository} from "../repo/Repository.js";


export class HotelService{


    constructor() {
        this.hotelRepo = new Repository();
        this.path="/hotel";

    }
    saveHotel(hotel){
       return  this.hotelRepo.save(this.path,hotel);
        }

    updateHotel(hotel){
       return this.hotelRepo.update(this.path,hotel);
    }
    deleteHotel(hotelID){
        return this.hotelRepo.delete(this.path+"?hotelID="+hotelID);
    }

    loadAllHotel(){
            return this.hotelRepo.getAll(this.path+"/!image");
    }

}