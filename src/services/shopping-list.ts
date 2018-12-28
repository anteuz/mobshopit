import {Ingredient}   from '../model/ingredient';
import {EventEmitter} from '@angular/core';

export class ShoppingListService {

  private ingredients: Ingredient[] = [];

  public  newIngredientEvent = new EventEmitter<Ingredient[]>();

  addItem(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.newIngredientEvent.emit(this.ingredients.slice());
  }

  addItems(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.newIngredientEvent.emit(this.ingredients.slice());
    //TODO increment if already in list
  }

  getItems() {
    return this.ingredients.slice();
  }

  removeItem(ingredient: Ingredient) {
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
    this.newIngredientEvent.emit(this.ingredients.slice());
  }
}
