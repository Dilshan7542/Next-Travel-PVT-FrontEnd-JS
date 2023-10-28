import {Customer} from "../model/Customer.js";
import {Login} from "../model/Login.js";
export class CustomerLoginController {

    constructor() {
        $("#btnCustomerLogin").click(this.handleLoginCustomer.bind(this));
        $("#btnCustomerRegister").click(this.handleRegisterCustomer.bind(this));
    }
    handleLoginCustomer(){
        let email = $("#loginEmail").val();
        $.ajax({
            url:"http://desktop-m37ask3.lan:8080/api/v1/gateway/customer/search/email?email="+email,
            method:"GET",
            dataType:"json",
            contentType:"application/json",
            headers:{
               "Authorization":"Basic "+window.btoa(email+":"+$("#loginPassword").val()),
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials:true,
         //   data:JSON.stringify(new Login($("#loginEmail").val(),$("#loginPassword").val())),
            success:function (resp){
                  //  window.location.replace("../page/admin/console.html");
                console.log(resp);
                sessionStorage.setItem("customerDetails",resp);
             $(location).prop("href","/next-travel-frontend/page/customer/dashboard.html");


            },
            error:function (error){

            },

        });
    }
    handleRegisterCustomer(){
        let customer = {
            "nic":$("#nic").val(),
            "name":$("#name").val(),
            "email":$("#registerEmail").val(),
            "address":$("#address").val(),
            "pwd":$("#registerPassword").val(),
        }
     /*   let customer = new Customer();
        customer.nic=$("#nic").val();
        customer.name=$("#name").val();
        customer.email=$("#registerEmail").val();
        customer.address=$("#address").val();
        customer.pwd=$("#registerPassword").val();*/
        if(this.isValid(customer)){
        $.ajax({
            url:"http://desktop-m37ask3.lan:8080/api/v1/gateway/customer/register",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify(customer),
            success:function (resp){
                alert("Registered..!!");
            },
            error:function (error){
                alert("Error..!!");
            }



        });
        }
    }

    isValid(customer) {
        const nic=/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
        const  name=/^([A-z]){2,}$/;
        const email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(!nic.test(customer.nic)){
          alert("invalid NIC")
          return null;
      }else{
        if(!name.test(customer.name)){
          alert("invalid Name")
            return null;
        }else {
            if($("#conformPassword").val()!==customer.pwd){
          alert("invalid PWd")
                return null;
            }else {
                if(!email.test(customer.email)){
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