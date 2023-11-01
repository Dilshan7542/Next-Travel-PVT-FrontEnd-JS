import {Repository} from "../repo/Repository.js";

export class VehicleCategoryService {
    constructor() {
        this.vehicleCategoryRepo=new Repository();
        this.path="/vehicle/category";
    }
    saveVehicleCategory(vehicleCategory){
        return this.vehicleCategoryRepo.save(this.path,vehicleCategory);
    }

    updateVehicleCategory(vehicleCategory){
        return this.vehicleCategoryRepo.update(this.path,vehicleCategory);

    }
    deleteVehicleCategory(vehicleCategoryID){
        return this.vehicleCategoryRepo.delete(this.path+"?vehicleCategoryID="+vehicleCategoryID);
    }

    loadAllVehicleCategory(){
        return this.vehicleCategoryRepo.getAll(this.path);
    }

}