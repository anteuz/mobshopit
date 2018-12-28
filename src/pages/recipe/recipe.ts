import {Component, OnInit}                   from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Recipe}                              from '../../model/recipe-model';
import {EditRecipePage}                      from '../edit-recipe/edit-recipe';
import {RecipeService}                       from '../../services/recipes';
import {RecipesPage}                         from '../recipes/recipes';
import {ShoppingListService}                 from '../../services/shopping-list';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  private recipe: Recipe;
  private recipeIndex: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public recipeService: RecipeService,
              public shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.recipeIndex = this.navParams.get('index');
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.recipeIndex});
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.recipeIndex);
    this.navCtrl.push(RecipesPage);
  }

  onAddIngredients() {
    this.shoppingListService.addItems(this.recipe.ingredients);
  }
}
