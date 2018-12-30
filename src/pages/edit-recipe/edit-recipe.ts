import {Component, OnInit}                             from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  ToastController
}                                                      from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService}                                 from '../../services/recipes';
import {Recipe}                                        from '../../model/recipe-model';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{

  mode = 'New';
  recipe: Recipe;
  recipeIndex: number;
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private actSheet: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipeServices: RecipeService) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if(this.mode == 'Edit') {
      this.recipeIndex = this.navParams.get('index');
      this.recipe = this.navParams.get('recipe');
    }
    this.initializeForm();
  }

  onSubmit() {
    console.log(this.recipeForm);
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1};
      });
    }

    const recipe = new Recipe(value.title, value.description, value.difficulty, ingredients);

    if (this.mode == 'Edit') {
      this.recipeServices.updateRecipe(this.recipeIndex, recipe);
    }
    else {
      this.recipeServices.addRecipe(recipe);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode == 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

      this.recipeForm = new FormGroup({
        'title': new FormControl(title, Validators.required),
        'description': new FormControl(description, Validators.required),
        'difficulty': new FormControl(difficulty, Validators.required),
        'ingredients': new FormArray(ingredients)
      });
  }

  onManageIngredients() {

   const actSheet = this.actSheet.create({
     title: 'What do you want to do?',
     buttons: [
       {
         text: 'Add Ingredient',
         handler: () => {
          this.createNewIngredientAlert().present();
         }
       },
       {
         text: 'Remove all Ingredients',
         role: 'destructive',
         handler: () => {
          const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
          const len = fArray.length;
          if (len >0 ) {
            for (let i = len -1; i >= 0; i--) {
              fArray.removeAt(i);
            }
            this.toastCtrl.create({
                message: 'Ingredients removed!',
                duration: 1000,
                position: 'bottom'
              }
            ).present();
          }
         }
       },
       {
         text: 'Cancel',
         role: 'cancel'
       }
     ]
   });

   actSheet.present();

  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              this.toastCtrl.create({
                message: 'Please enter valid value!',
                duration: 1000,
                position: 'bottom'
                }
              ).present();
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            this.toastCtrl.create({
                message: data.name + ' added to recipe!',
                duration: 1000,
                position: 'bottom'
              }
            ).present();
          }
        }
      ]
    });
  }
}
