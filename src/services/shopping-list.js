var ShoppingListService = /** @class */ (function () {
    function ShoppingListService() {
        this.ingredients = [];
    }
    ShoppingListService.prototype.addItem = function (ingredient) {
        this.ingredients.push(ingredient);
    };
    ShoppingListService.prototype.addItems = function (ingredients) {
        (_a = this.ingredients).push.apply(_a, ingredients);
        var _a;
    };
    ShoppingListService.prototype.getItems = function () {
        this.ingredients.slice();
    };
    ShoppingListService.prototype.removeItem = function (ingredient) {
        this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
    };
    return ShoppingListService;
}());
export { ShoppingListService };
//# sourceMappingURL=shopping-list.js.map