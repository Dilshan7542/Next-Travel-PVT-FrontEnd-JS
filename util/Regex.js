export class Regex{

    constructor() {
        this.nic=/^^(?:19|20)?\d{2}[0-9]{10}|[0-9]{9}[x|X|v|V]$/;
        this.name=/^([A-Z]){1}([a-z]){2,}$/;
        this.email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.integer=/^([+]?[1-9]\d*|0)$/;
        this.double=/^[+-]?([0-9]*[.])?[0-9]+$/;
    }
    nameTest(value){
        if(this.name.test(value)){
            return true;
        }
    }
    doubleTest(value){
        if(this.double.test(value)){
            return true;
        }
    }
    integerTest(value){
        if(this.integer.test(value)){
            return true;
        }
    }
    nicTest(value){
        if(this.nic.test(value)){
            return true;
        }
    }
    emailTest(value){
        if(this.email.test(value)){
            return true;
        }
    }
}