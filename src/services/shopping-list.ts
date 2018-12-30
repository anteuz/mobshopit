import {Ingredient}               from '../model/ingredient';
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient}               from '@angular/common/http';
import {AuthService}              from './auth';
import {map}                      from 'rxjs/operators';

@Injectable()
export class ShoppingListService {

  constructor (private httpClient: HttpClient, private authService: AuthService) {}

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

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.httpClient.put('https://my-recipe-book-anteuz.firebaseio.com/users/' +userId + '/shopping-list.json?auth='+token, this.ingredients);
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.httpClient.get<Array<Ingredient>>('https://my-recipe-book-anteuz.firebaseio.com/users/' +userId + '/shopping-list.json?auth='+token)
      .pipe(
        map(data => {
          this.ingredients = data;
          this.newIngredientEvent.emit(this.ingredients.slice());
          return data;
        })
      );
  }
}
