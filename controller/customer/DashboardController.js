import {VehicleBrandService} from "../../service/VehicleBrandService.js";
import {VehicleCategoryService} from "../../service/VehicleCategoryService.js";
import {HotelService} from "../../service/HotelService.js";
import {CustomerService} from "../../service/CustomerService.js";
import {TravelAreaService} from "../../service/TravelAreaService.js";
import {TravelCategoryService} from "../../service/TravelCategoryService.js";

export class DashboardController{

    constructor() {
        let vehicleBrandService = new VehicleBrandService();
        let vehicleCategoryService = new VehicleCategoryService();
        let hotelService = new HotelService();
        let customerService = new CustomerService();
        let travelAreaService = new TravelAreaService();
        let travelCategoryService = new TravelCategoryService();
            $(".fragment-01").click(function (){

            });
    }
}
new DashboardController();