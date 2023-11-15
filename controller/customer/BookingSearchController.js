import {TravelAreaService} from "../../service/TravelAreaService.js";
import {HotelService} from "../../service/HotelService.js";

export class BookingSearchController {

    constructor() {
        this.travelAreaService = new TravelAreaService();
        this.hotelService = new HotelService();
        $(".adult-children-room-section>div>p").click(this.adultChildrenRoomHandler.bind(this));
        $(".btn-option-search").click(this.btnOptionSearchHandler.bind(this));

       this.loadAllTravelArea();
        this.adultChildrenRoomHandlerOptionManage();

    }

    searchHandler() {

    }

    btnOptionSearchHandler() {
        $(".fragment-07").hide();
        $(".fragment-05-main-section>section").css("border-color","black"); // if click event tow time
        $(".fragment-05-main-section>section>:last-child").css("background-color","rgb(255,255,255)");

        let location = $("#locationSelectBox").val();
        let searchDate = $("#searchDate").val();

        if (location === "1") {
            alert("Please Select Location");
        } else if (!searchDate) {
            alert("Please Select Date!");
        } else {

            let promise = this.hotelService.findAllHotelLocation(location);
            document.querySelector(".option-body").style.display = "none";
            promise.then(resp => {
                $(".fragment-04-main-section").html("");
                for (let hotel of resp.body) {
                    $(".fragment-04-main-section").append(` 
 <section>
 <section>
  <img src="data:image/png;base64,${hotel.image}" alt="">
                            </section>
                            <section>
                                <section><p>Hotel Name</p><p>${hotel.name}</p></section>
                                <section><p>Email </p><p>${hotel.email}</section>
                                <section><p>Location</p><p>${hotel.location}</p></section>
                                <section><p>Star Rate</p><p>${hotel.starRate}</p></section>
                                <section><p>Tel</p><p>${hotel.tel}</p></section>
                               <p>${JSON.stringify(hotel)}</p>
                            </section>
                            <div></div>
                    </section>`);
                    $(".fragment-04-main-section >:last-child").click(function () {
                        $(".fragment-04-main-section>section").css("border-color","black");
                        $(".fragment-04-main-section>section>:last-child").css("background-color","rgb(255,255,255)");
                        $(this).children().eq(2).css("background-color", "#1c7ff3c2");
                        sessionStorage.setItem("selectedHotel", $(this).children().eq(1).children().eq(5).text())
                        $(this).css("border-color","blue");
                    });
                }
                $(".fragment-03").css("height", "25vh");
                $(".fragment-04").show();
                $(".fragment-05").show();
                $(".fragment-06").show();


            });
        }

    }

    loadAllTravelArea() {
        let promise = this.travelAreaService.loadAllTravelArea();
        sessionStorage.removeItem("selectedVehicle");
        sessionStorage.removeItem("selectedHotel");
        promise.then(resp => {
            $("#locationSelectBox").html("");
            $("#locationSelectBox").append(` <option value="1" selected>Where are you going?</option>`);
            for (let travelArea of resp.body) {
                $("#locationSelectBox").append(`<option value="${travelArea.areaName}">${travelArea.areaName}</option>`);
            }
        }).catch(e =>{
            console.log(e.statusText);
            alert("Travel Area Failed");
            $(".fragment-03").hide();
        });


    }

    adultChildrenRoomHandler() {
        let element = document.querySelector(".option-body");
        if (element.style.display === "block") {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    }

    adultChildrenRoomHandlerOptionManage() {

        $("#adultIncrement").click(function () {
            $("#adultValue").text(incrementMethod($(this).parent().children().eq(1)));
        });
        $("#adultDecrement").click(function () {
            $("#adultValue").text(decrementMethod($(this).parent().children().eq(1)));
        });
        $("#childrenIncrement").click(function () {
            $("#childrenValue").text(incrementMethod($(this).parent().children().eq(1)));
        });
        $("#childrenDecrement").click(function () {
            $("#childrenValue").text(decrementMethod($(this).parent().children().eq(1)));
        });
        $("#roomIncrement").click(function () {
            $("#roomValue").text(incrementMethod($(this).parent().children().eq(1)));
        });
        $("#roomDecrement").click(function () {
            $("#roomValue").text(decrementMethod($(this).parent().children().eq(1)));
        });


    }


}

function incrementMethod(field) {
    let adultNumber = Number(field.text());
    if (adultNumber > 9) {
        field.text("1");
        adultNumber = 1;
    } else {
        field.text(++adultNumber);
    }
    return adultNumber;
}

function decrementMethod(field) {
    let adultNumber = Number(field.text());
    if (adultNumber < 1) {
        field.text("10");
        adultNumber = 10;
    } else {
        field.text(--adultNumber);

    }
    return adultNumber;
}

let bookingSearchController = new BookingSearchController();