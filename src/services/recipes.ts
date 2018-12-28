import {Recipe}       from '../model/recipe-model';
import {EventEmitter} from '@angular/core';

export class RecipeService {

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
}
