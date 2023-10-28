export class AdminLoginController{


    constructor() {
        $("#btnAdminLogin").click(this.handleLoginCustomer.bind(this));
    }
    handleLoginCustomer(){
        let email = $("#loginEmail").val();
        $.ajax({
            url:"http://desktop-m37ask3.lan:8080/api/v1/gateway/user/search/email?email="+email,
            method:"GET",
            dataType:"json",
            contentType:"application/json",
            headers:{
                "Authorization":"Basic "+window.btoa(email+":"+$("#loginPassword").val()),
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials:true,
            success:function (resp){
                console.log(resp);
                sessionStorage.setItem("userDetails",resp);
                $(location).prop("href","/next-travel-frontend/page/admin/console.html");


            },
            error:function (error){

            },

        });
    }
}
let adminLoginController = new AdminLoginController();