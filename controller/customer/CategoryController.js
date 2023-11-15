import {VehicleBrandService} from "../../service/VehicleBrandService.js";
import {VehicleCategoryService} from "../../service/VehicleCategoryService.js";
import {HotelService} from "../../service/HotelService.js";
import {CustomerService} from "../../service/CustomerService.js";
import {TravelAreaService} from "../../service/TravelAreaService.js";
import {TravelCategoryService} from "../../service/TravelCategoryService.js";


export class CategoryController{
    constructor() {
        this.vehicleBrandService = new VehicleBrandService();
        $(".fragment-02 .main-category-section>:nth-child(1)").click(this.mainCategoryHandlerRegular.bind(this));
        $(".fragment-02 .main-category-section>:nth-child(2)").click(this.mainCategoryHandlerMedium.bind(this));
        $(".fragment-02 .main-category-section>:nth-child(3)").click(this.mainCategoryHandlerLuxury.bind(this));
        $(".fragment-02 .main-category-section>:nth-child(4)").click(this.mainCategoryHandlerSuperLuxury.bind(this));

    }
    mainCategoryHandlerRegular(event){
          this.visibleAllFields(event);
    }
    mainCategoryHandlerMedium(event){
        this.visibleAllFields(event);
    }
    mainCategoryHandlerLuxury(event){
        this.visibleAllFields(event);
    }
    mainCategoryHandlerSuperLuxury(event){
        this.visibleAllFields(event);
    }
   visibleAllFields(evt){
        $(".fragment-02").fadeOut(500);
       $(".fragment-03").show();

        let categoryID=1;
        switch (evt.target.innerText) {
            case "Regular": categoryID=1;break;
            case "Medium": categoryID=2;break;
            case "Luxury": categoryID=3;break;
            case "Super-Luxury": categoryID=4;break;
        }
       const travelCategory={
            travelCategoryID:categoryID,
           categoryName:evt.target.innerText.toLocaleLowerCase()
       }
        sessionStorage.setItem("travelCategory",JSON.stringify(travelCategory));
        let promise = this.vehicleBrandService.findAllVehicleCategory(categoryID);

        promise.then((resp) =>{
                $(".fragment-05-main-section").html("");
            for (let vehicle of resp.body) {
                $(".fragment-05-main-section").append(` 
                <section>
                         <section>
                                    <img src="data:image/png;base64,${vehicle.image}" alt="">
                            </section>
                            <section>
                                <section><p>Brand Name </p><p>${vehicle.brandName}</p></section>
                                <section><p>Fee For Day </p><p>${vehicle.fee1Day}</section>
                                <section><p>Fee for 1KM</p><p>${vehicle.fee1KM}</p></section>
                                <section><p>Fuel for 1KM</p><p>${vehicle.fuel1KM}</p></section>
                                <section><p>Seat</p><p>${vehicle.seat}</p></section>
                               <p>${JSON.stringify(vehicle)}</p>
                            </section>
                            <div></div>
                    </section>`);
                $(".fragment-05-main-section >:last-child").click(function () {
                    $(".fragment-05-main-section>section").css("border-color","black");
                    $(".fragment-05-main-section>section>:last-child").css("background-color","rgb(255,255,255)");
                    $(this).children().eq(2).css("background-color", "#1c7ff3c2");
                    sessionStorage.setItem("selectedVehicle", $(this).children().eq(1).children().eq(5).text())
                    $(this).css("border-color","blue");
                });
            }

        });
    }

}
let categoryController = new CategoryController();