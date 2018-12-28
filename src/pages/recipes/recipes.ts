import {Component, OnInit}          from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {EditRecipePage}             from '../edit-recipe/edit-recipe';
import {RecipeService}              from '../../services/recipes';
import {Recipe}                     from '../../model/recipe-model';
import {RecipePage}                 from '../recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage implements OnInit{

  private recipes: Recipe[] = [];

  constructor (private navCtrl: NavController, private recipesService: RecipeService) {}

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(index: number) {
    this.navCtrl.push(RecipePage, {recipe: this.recipes[index], index: index});

  }

  ngOnInit(): void {
    this.recipesService.newRecipeEvent.subscribe(
      recipes => this.recipes = recipes
    );
  }
}
