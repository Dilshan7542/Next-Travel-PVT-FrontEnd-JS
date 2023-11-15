import {BookingService} from "../../service/BookingService.js";

export class PaidBookingController{

    constructor() {
        this.loadAllPaidBooking();
        this.bookingService = new BookingService();
    }
    loadAllPaidBooking(){

    }
}
let paidBookingController = new PaidBookingController();