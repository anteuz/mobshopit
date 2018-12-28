import {Component, OnInit}                   from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm}                              from '@angular/forms';
import {ShoppingListService}                 from '../../services/shopping-list';
import {Ingredient}                          from '../../model/ingredient';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage implements OnInit{

  ingredients: Ingredient[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public slService: ShoppingListService) {
  }

  ngOnInit() {
    this.slService.newIngredientEvent.subscribe(
      ingredients => this.ingredients = ingredients
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  onAddItem(form: NgForm) {
    let ingredient = new Ingredient(form.value.ingredientName, form.value.ingredientAmount);

    this.slService.addItem(ingredient);

    form.reset();
  }

  onRemoveItem(index: Ingredient) {
    this.slService.removeItem(index);
  }

}
