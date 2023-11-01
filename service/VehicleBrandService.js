import {Repository} from "../repo/Repository.js";

export class VehicleBrandService {

    constructor() {
    this.vehicleBrandRepo=new Repository();
    this.path="/vehicle/brand";
    }
    saveVehicle(vehicle){
     return this.vehicleBrandRepo.save(this.path,vehicle);
    }

    updateVehicle(vehicle){
     return this.vehicleBrandRepo.update(this.path,vehicle);

    }
    deleteVehicle(vehicleID){
        return this.vehicleBrandRepo.delete(this.path+"?vehicleID="+vehicleID);
    }

    loadAllVehicleWithoutImage(){
        return this.vehicleBrandRepo.getAll(this.path+"/!image");
    }
}