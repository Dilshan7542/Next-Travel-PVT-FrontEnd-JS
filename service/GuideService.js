import {Repository} from "../repo/Repository.js";

export class GuideService{
    constructor() {
        this.guideRepo=new Repository();
        this.path="/guide";
    }
    saveGuide(guide){
        return this.guideRepo.save(this.path,guide);
    }

    updateGuide(guide){
        return this.guideRepo.update(this.path,guide);

    }
    deleteGuide(guideID){
        return this.guideRepo.delete(this.path+"?guideID="+guideID);
    }

    loadAllGuide(){
        return this.guideRepo.getAll(this.path);
    }
}