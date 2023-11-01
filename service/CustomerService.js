import {Repository} from "../repo/Repository.js";

export class CustomerService{
    constructor() {
        this.customerRepo=new Repository();
        this.path="/customer";
    }
    saveCustomer(customer){
        return this.customerRepo.save(this.path,customer);
    }

    updateCustomer(customer){
        return this.customerRepo.update(this.path,customer);

    }
    searchByEmail(email){
        return this.customerRepo.search(this.path+"/search/email?email="+email);
    }
    searchBasicAuth(email,pwd){
        return this.customerRepo.searchBasicAuth(this.path+"/search/email?email="+email,email,pwd);
    }
    deleteCustomer(customerID){
        return this.customerRepo.delete(this.path+"?customerID="+customerID);
    }

    loadAllCustomer(){
        return this.customerRepo.getAll(this.path);
    }
}