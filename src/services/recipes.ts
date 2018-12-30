import {Recipe}                   from '../model/recipe-model';
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient}               from '@angular/common/http';
import {AuthService}              from './auth';
import {map}                      from 'rxjs/operators';

@Injectable()
export class RecipeService {

  constructor (private httpClient: HttpClient,
               private authService: AuthService) {}

  private recipes: Recipe[] = [];

  public newRecipeEvent = new EventEmitter<Recipe[]>();

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.newRecipeEvent.emit(this.recipes.slice());
  }

  public getRecipes() {
    return this.recipes.slice();
  }

  public updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.newRecipeEvent.emit(this.recipes.slice());
  }

  public removeRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.newRecipeEvent.emit(this.recipes.slice());
  }

  public storeRecipes(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.httpClient.put('https://my-recipe-book-anteuz.firebaseio.com/users/' +userId + '/recipes.json?auth='+token, this.recipes);
  }

  public fetchRecipes(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.httpClient.get<Array<Recipe>>('https://my-recipe-book-anteuz.firebaseio.com/users/' +userId + '/recipes.json?auth='+token)
      .pipe(
        map(data => {
          const recipes: Recipe[] = data ? data : [];

          for (let item of recipes) {
            if(!item.hasOwnProperty('ingredients')) {
              item.ingredients = [];
            }
          }
          this.recipes = data;
          this.newRecipeEvent.emit(this.recipes.slice());
          return data;
        })
      );
  }
}
