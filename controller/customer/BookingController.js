import {BookingService} from "../../service/BookingService.js";
import {TravelService} from "../../service/TravelService.js";

export class BookingController{

    constructor() {
this.bookingService = new BookingService();

            $("#btnBooking").click(this.bookingHandler.bind(this));
            $("#btnPayment").click(this.paymentHandler.bind(this));
            $("#btnBookingConformModel").click(this.paymentConformHandler.bind(this));


    }
    bookingHandler(){
            if(!sessionStorage.getItem("selectedVehicle")){
                alert("Please Select Vehicle");
                return;
            }else if(!sessionStorage.getItem("selectedHotel")){
                alert("Please Select Hotel");
                return;
            }
        this.adult = Number($("#adultValue").text());
        this.children =Number( $("#childrenValue").text());
        this.room = Number($("#roomValue").text());
        this.room +=this.room===0 ? 1:this.room;
        $(".fragment-07-mainSection>:first-child>:nth-child(1)>:last-child").text(this.adult);
        $(".fragment-07-mainSection>:first-child>:nth-child(2)>:last-child").text(this.children);
        $(".fragment-07-mainSection>:first-child>:nth-child(3)>:last-child").text(this.room);

        this.vehicle = JSON.parse(sessionStorage.getItem("selectedVehicle"));
        this.hotel = JSON.parse(sessionStorage.getItem("selectedHotel"));
        sessionStorage.removeItem("selectedVehicle");
        sessionStorage.removeItem("selectedHotel");
        $("#hotelSelectSection>:first-child").html("");
        $("#hotelSelectSection>:first-child").append(`<img src="data:image/png;base64,${this.hotel.image}" alt="">`);
        $("#hotelSelectSection>:last-child>:nth-child(1)>:last-child").text(this.hotel.name);
        $("#hotelSelectSection>:last-child>:nth-child(2)>:last-child").text(this.hotel.email);
        $("#hotelSelectSection>:last-child>:nth-child(3)>:last-child").text(this.hotel.location);
        $("#hotelSelectSection>:last-child>:nth-child(4)>:last-child").text(this.hotel.starRate);
        $("#hotelSelectSection>:last-child>:nth-child(5)>:last-child").text(this.hotel.tel);
        $("#hotelSelectSection>:last-child>:nth-child(6)>:last-child").html("");
        $("#hotelSelectSection>:last-child>:nth-child(6)>:last-child").click(this.calculatePrice.bind(this));
        $("#hotelSelectSection>:last-child>:nth-child(6)>:last-child").append(`
                        <option value="${this.hotel.hotelOption[0].option1}">${this.hotel.hotelOption[0].option1}</option>
                        <option value="${this.hotel.hotelOption[0].option2}">${this.hotel.hotelOption[0].option2}</option>
                        <option value="${this.hotel.hotelOption[0].option3}">${this.hotel.hotelOption[0].option3}</option>
                        <option value="${this.hotel.hotelOption[0].option4}">${this.hotel.hotelOption[0].option4}</option>`);
        $("#vehicleSelectSection>:first-child").html("");
        $("#vehicleSelectSection>:first-child").append(`<img src="data:image/png;base64,${this.vehicle.image}" alt="">`);
        let totalHeadCount=this.adult+this.children;
       this.vehicleQty=1;
        if(totalHeadCount>4){
           this.vehicleQty++;
        }else if(totalHeadCount>8){
            this.vehicleQty++;
        }
        $("#vehicleSelectSection>:last-child>:nth-child(1)>:last-child").text(this.vehicleQty);
        $("#vehicleSelectSection>:last-child>:nth-child(2)>:last-child").text(this.vehicle.brandName);
        $("#vehicleSelectSection>:last-child>:nth-child(3)>:last-child").text(this.vehicle.fee1Day);
        $("#vehicleSelectSection>:last-child>:nth-child(4)>:last-child").text(this.vehicle.fee1KM);
        $("#vehicleSelectSection>:last-child>:nth-child(5)>:last-child").text(this.vehicle.fuel1KM);
        $("#vehicleSelectSection>:last-child>:nth-child(6)>:last-child").text(this.vehicle.seat);
        this.calculatePrice();
        $(".fragment-02").hide();
        $(".fragment-03").show();
        $(".fragment-04").hide();
        $(".fragment-05").hide();
        $(".fragment-06").hide();
        $(".fragment-07").show();
    }
    paymentHandler(){
        if (!localStorage.getItem("Authorization")) {
            alert("Please Sign in First !!!");
            $(window).scrollTop(0);
            document.getElementById("btnLogin").click();
            return;
        }
        document.getElementById("btnBookingConformModelShow").click();


    }
    paymentConformHandler(){
        let date=new Date().toISOString().split("T")[0]; //temporary
        let minutes=new Date().getMinutes()<10 ? "0"+new Date().getMinutes():new Date().getMinutes();
        let hours=new Date().getHours()<10 ? "0"+new Date().getHours():new Date().getHours();
        let time=hours+":"+ minutes;
        let customer =JSON.parse( localStorage.getItem("userDetails"));
        const travelCategory= JSON.parse(sessionStorage.getItem("travelCategory"));
        /*not completed*/
        let travel={
            startDate:date, // temporary
            endDate:null, // temporary
            countDay:0,
            countNight:0,
            noAdults:this.adult,
            children:this.children,
            headCount:this.adult+this.children,
            pets:0,
            guide:0,
            paidValue:this.totalAmount,
            remark:"",
            travelCategory:{
                travelCategoryID: travelCategory.travelCategoryID
            },
        }
        console.log(time);
        new TravelService().saveTravel(travel) // Save Travel
            .then(resp=>{
                let booking={
                    date:date,
                    time:time,
                    paidValue:this.totalAmount,
                    paymentStatus:true,
                    travel:sessionStorage.getItem("travelArea"),
                    hotel:JSON.stringify(this.hotel),
                    vehicle:JSON.stringify(this.vehicle),
                    guide:0, // Not Ready
                    customer:customer
                }

                new BookingService().saveBooking(booking).then(resp => {
                    alert("BOOKED");
                    location.reload();

                }).catch(e => {
                    new TravelService().deleteTravel(resp.body.travelID);
                    alert("BOOKING FAILED");

                });
            }).catch(e => {
            alert("TRAVEL FAILED");
            location.reload();
        });
    }
    calculatePrice(){
        let vehicleAmount=this.vehicleQty*(this.vehicle.fee1Day+this.vehicle.fee1KM+this.vehicle.fuel1KM);
        let hotelAmount=Number($("#hotelOptionBox").val());
        $("#travelPriceSection>section>:nth-child(2)>:nth-child(2)").text(hotelAmount+"");
        $("#travelPriceSection>section>:nth-child(3)>:nth-child(2)").text(vehicleAmount+"");
        $("#travelPriceSection>section>:nth-child(4)>:nth-child(2)").text("0");
        $("#travelPriceSection>section>:nth-child(5)>:nth-child(2)").text("0");
        this.totalAmount=vehicleAmount+hotelAmount;
        $("#travelPriceSection>section>:nth-child(6)>:nth-child(2)").text((this.totalAmount)+"");
        $("#totalAmount").text(this.totalAmount+"");
    }
}
new BookingController();