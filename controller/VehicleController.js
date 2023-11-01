import {VehicleBrandService} from "../service/VehicleBrandService";
import {VehicleCategoryService} from "../service/VehicleCategoryService";

export class VehicleController{

    constructor() {
        this.vehicleService=new VehicleBrandService();
        this.vehicleCategory=new VehicleCategoryService();

    }
    loadAllVehicleBrand(){
        let promise = this.vehicleService.loadAllVehicleWithoutImage();
        let promiseCategory = this.vehicleCategory.loadAllVehicleCategory();
        promise.then(resp=>{
            promiseCategory.then(category =>{
                category.body;
            });
            for (let vehicle of resp.body) {

            }

        });
    }
}
let vehicleController = new VehicleController();