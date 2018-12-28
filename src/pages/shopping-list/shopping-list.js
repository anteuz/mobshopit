var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../model/ingredient';
var ShoppingListPage = /** @class */ (function () {
    function ShoppingListPage(navCtrl, navParams, slService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.slService = slService;
    }
    ShoppingListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ShoppingListPage');
    };
    ShoppingListPage.prototype.onAddItem = function (form) {
        var ingredient = new Ingredient(form.value.ingredientName, form.value.ingredientAmount);
        this.slService.addItem(ingredient);
        console.log(this.slService.getItems());
        form.reset();
    };
    ShoppingListPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-shopping-list',
            templateUrl: 'shopping-list.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ShoppingListService])
    ], ShoppingListPage);
    return ShoppingListPage;
}());
export { ShoppingListPage };
//# sourceMappingURL=shopping-list.js.map