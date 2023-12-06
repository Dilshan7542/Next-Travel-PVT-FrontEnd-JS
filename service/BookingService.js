import {RestApiRepo} from "../model/RestApiRepo.js";

export class BookingService{

    constructor() {
        this.bookingRepo=new RestApiRepo();
        this.path="/customer/api/v1/booking";
    }
    saveBooking(booking){
        return this.bookingRepo.save(this.path,booking);
    }
    searchBookingCustomerID(customerID){
        return this.bookingRepo.search(this.path+"/search/customer?customerID="+customerID);
    }
    updateBooking(booking){
        return this.bookingRepo.update(this.path,booking);
    }
    deleteBooking(bookingID){
        return this.bookingRepo.delete(this.path+"/"+bookingID);
    }

    loadAllBooking(){
        return  this.bookingRepo.getAll(this.path);
    }

}