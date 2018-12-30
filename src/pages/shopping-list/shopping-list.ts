import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  PopoverController
}                                     from 'ionic-angular';
import {NgForm}                       from '@angular/forms';
import {ShoppingListService}          from '../../services/shopping-list';
import {Ingredient}                   from '../../model/ingredient';
import {SLOptionsPage}                from './sl-options/sl-options';
import {AuthService}                  from '../../services/auth';
import {Subscription}                 from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage implements OnInit, OnDestroy{

  ingredients: Ingredient[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public slService: ShoppingListService,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.subscriptions.add(this.slService.newIngredientEvent.subscribe(
      ingredients => this.ingredients = ingredients
    ));
    console.log(this.subscriptions);
  }

  onAddItem(form: NgForm) {
    let ingredient = new Ingredient(form.value.ingredientName, form.value.ingredientAmount);

    this.slService.addItem(ingredient);

    form.reset();
  }

  onRemoveItem(index: Ingredient) {
    this.slService.removeItem(index);
  }

  onShowOptions(event: MouseEvent) {
    const popover = this.popoverCtrl.create(SLOptionsPage);
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if(!data) {
          return;
        }
        if (data.action == 'load') {
          loading.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.slService.fetchList(token)
                  .subscribe(
                    (list: Ingredient[]) => {
                      loading.dismiss();
                      if (list) {
                        this.ingredients = list;
                      } else {
                        this.ingredients = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.error);
                    }
                  );
              }
            );
        } else if (data.action == 'store') {
          loading.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.slService.storeList(token).subscribe(
                  () => loading.dismiss(),
                  error => {
                    loading.dismiss();
                    this.handleError(error.error);
                  }
                );
              }
            ); //Handle invalid token later
        }
      }
    );
  }
  private handleError(errorMessage: string) {
    this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    }).present();
  }

  ngOnDestroy () {
    this.subscriptions.unsubscribe();
    console.log(this.subscriptions);
  }
}
