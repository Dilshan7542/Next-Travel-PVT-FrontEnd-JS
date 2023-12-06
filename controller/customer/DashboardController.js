import {Regex} from "../../util/Regex.js";
import {CustomerService} from "../../service/CustomerService.js";
import {BookingService} from "../../service/BookingService.js";

export class DashboardController {

    constructor() {
        document.getElementById("searchDate").setAttribute("min", new Date().toISOString().split("T")[0]);

        $("#btnHome").click(function () {
            location.reload();
        });
        $("#btnCustomerUpdate").click(this.customerUpdateHandler.bind(this));
        $("#btnMyBooking").click(this.bookingHandler.bind(this));
        this.loadCustomerDetailHandler();
    }

    loadCustomerDetailHandler() {
        const customer = JSON.parse(localStorage.getItem("userDetails"));
        $("#btnCustomerUpdate").hide();
        $(`#accountModelSection > p > :last-child`).off();
        $(`#accountModelSection > p > :last-child`).click(function () {
            $(this).parent().children().eq(1).hide();
            $(this).parent().children().eq(2).show();
            $(this).parent().children().eq(2).val($(this).parent().children().eq(1).text());
            $("#btnCustomerUpdate").show();
        });
        $(`#accountModelSection > p:nth-child(3) > :last-child`).off();
        $(`#accountModelSection > p > :nth-child(2)`).show();
        $(`#accountModelSection > p > :nth-child(3)`).hide();
        $(`#accountModelSection > p:nth-child(1) > :nth-child(2)`).text(customer.nic);
        $(`#accountModelSection > p:nth-child(2) > :nth-child(2)`).text(customer.name);
        $(`#accountModelSection > p:nth-child(3) > :nth-child(2)`).text(customer.email);
        $(`#accountModelSection > p:nth-child(4) > :nth-child(2)`).text(customer.address);
        $(`#accountModelSection > p:nth-child(5) > :nth-child(2)`).text(customer.tel);
        this.customerID=customer.customerID;
        $("#customerNic").val(customer.nic);
        $("#customerName").val(customer.name);
        $("#customerEmail").val(customer.email);
        $("#customerAddress").val(customer.address);
        $("#customerTel").val(customer.tel);
        this.bookingHandler(customer.customerID);
    }

    customerUpdateHandler() {
        let customer = {
            customerID: this.customerID,
            nic: $("#customerNic").val(),
            name: $("#customerName").val(),
            email: $("#customerEmail").val(),
            address: $("#customerAddress").val(),
            tel: $("#customerTel").val()
        }
        if (this.isValid(customer)) {
            new CustomerService().updateCustomer(customer).then(resp => {
                localStorage.setItem("userDetails", JSON.stringify(resp.body));
                this.loadCustomerDetailHandler();
                alert("UPDATED");
            }).catch(e => {
                alert("UPDATE FAILED");
            });
        }

    }
    bookingHandler(customerID){
        console.log(customerID)
        let promise = new BookingService().searchBookingCustomerID(customerID);
        console.log(promise);
            promise.then(resp=>{
        $("#tblBooking").html("");
                for (let booking of resp.body) {
        $("#tblBooking").append(`
               <tr>
                    <th scope="col">${booking.bookingID}</th>
                    <th scope="col">${JSON.parse(booking.hotel).name}</th>
                    <th scope="col">${JSON.parse(booking.vehicle).brandName}</th>
                    <th scope="col">${JSON.parse(booking.guide).name}</th>
                    <th scope="col">${booking.travel}</th>
                    <th scope="col">${booking.date}</th>
                    <th scope="col">${booking.time}</th>
                    <th scope="col">${booking.paidValue}</th></tr>`);
                }
            });
    }

    isValid(customer) {
        let regex = new Regex();
        if (!regex.nicTest(customer.nic)) {
            alert("invalid NIC")
            return null;
        } else {
            if (!regex.nameTest(customer.name)) {
                alert("invalid Name")
                return null;
            } else {
                if (customer.address.length < 2) {
                    alert("invalid Address")
                    return null;
                } else {
                    if (!regex.emailTest(customer.email)) {
                        alert("invalid Email")
                        return null;
                    } else {
                        return customer;
                    }
                }
            }
        }
    }
}

new DashboardController();