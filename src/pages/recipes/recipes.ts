import {Component, OnDestroy, OnInit}                                                    from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, PopoverController} from 'ionic-angular';
import {EditRecipePage}                                                                  from '../edit-recipe/edit-recipe';
import {RecipeService}                                                                   from '../../services/recipes';
import {Recipe}                                                                          from '../../model/recipe-model';
import {RecipePage}                                                                      from '../recipe/recipe';
import {RecipesOptionsPage}                                                              from './recipes-options/recipes-options';
import {AuthService}                                                                     from '../../services/auth';
import {Subscription}                                                                    from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage implements OnInit, OnDestroy{

  private recipes: Recipe[] = [];

  private subscriptions:Subscription = new Subscription();

  constructor (private navCtrl: NavController,
               private recipesService: RecipeService,
               private popoverCtrl: PopoverController,
               private alertCtrl: AlertController,
               private loadingCtrl: LoadingController,
               private authService: AuthService) {}

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(index: number) {
    this.navCtrl.push(RecipePage, {recipe: this.recipes[index], index: index});

  }

  ngOnInit() {
    this.subscriptions.add(this.recipesService.newRecipeEvent.subscribe(
      recipes => this.recipes = recipes
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onShowOptions(event: MouseEvent) {
    const popover = this.popoverCtrl.create(RecipesOptionsPage);
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
                this.recipesService.fetchRecipes(token)
                  .subscribe(
                    (list: Recipe[]) => {
                      loading.dismiss();
                      if (list) {
                        this.recipes = list;
                      } else {
                        this.recipes = [];
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
                this.recipesService.storeRecipes(token).subscribe(
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
}
