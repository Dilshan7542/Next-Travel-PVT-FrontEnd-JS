import {Repository} from "../repo/Repository.js";

export class TravelAreaService{
    constructor() {
        this.travelAreaRepo=new Repository();
        this.path="/travel/area";
    }
    saveTravelArea(travelArea){
        return this.travelAreaRepo.save(this.path,travelArea);
    }

    updateTravelArea(travelArea){
        return this.travelAreaRepo.update(this.path,travelArea);

    }
    deleteTravelArea(travelAreaID){
        return this.travelAreaRepo.delete(this.path+"?travelAreaID="+travelAreaID);
    }

    loadAllTravelArea(){
        return this.travelAreaRepo.getAll(this.path);
    }
}