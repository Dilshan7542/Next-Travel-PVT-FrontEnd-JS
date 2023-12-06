import {CustomerService} from "../../service/CustomerService.js";
import {Regex} from "../../util/Regex.js";


export class CustomerLoginController {

    constructor() {
        $("#btnCustomerLogin").click(this.handleLoginCustomer.bind(this));
        $("#btnCustomerRegister").click(this.handleRegisterCustomer.bind(this));
        $("#btnLogout").click(function () {
            localStorage.removeItem("Authorization");
            localStorage.removeItem("UserDetails");
             location.reload();
        });
        this.customerService=new CustomerService();
    }
    handleLoginCustomer(){

            let promise = this.customerService.searchBasicAuth($("#loginEmail").val(),$("#customerLoginPassword").val());
            promise.then(resp=>{
                localStorage.setItem("userDetails",JSON.stringify(resp.body));
                console.log(resp.body);
                localStorage.setItem("Authorization",resp.resp.getResponseHeader("Authorization"));
                $("#btnLogin").hide();
                $("#btnSignup").hide();
                $("#btnMyBooking").show();
                $("#btnAccount").show();
                $("#btnLogout").show();
                location.reload();

            }).catch(e => { alert("Login Failed!!!  "+e.statusText);});
    }
    handleRegisterCustomer(){
        let customer = {
            "nic":$("#nic").val(),
            "name":$("#name").val(),
            "email":$("#registerEmail").val(),
            "address":$("#address").val(),
            "pwd":$("#registerPassword").val()
        }
        if(this.isValid(customer)){

            this.customerService.saveCustomer(customer).then(resp => {
                alert("REGISTERED");

            }).catch(e => alert("ERROR..!! "+ e.statusText));
        }
    }

    isValid(customer) {
       let regex = new Regex();
      if(!regex.nicTest(customer.nic)){
          alert("invalid NIC")
          return null;
      }else{
        if(!regex.nameTest(customer.name)){
          alert("invalid Name")
            return null;
        }else {
            if($("#conformPassword").val()!==customer.pwd){
          alert("invalid PWd")
                return null;
            }else {
                if(!regex.emailTest(customer.email)){
                    return null;
                }else {
              return customer;
                }
            }
        }
      }
    }
}
let customerLoginController = new CustomerLoginController();