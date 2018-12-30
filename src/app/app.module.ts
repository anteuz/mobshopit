import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp }             from './app.component';
import {TabsPage}            from '../pages/tabs/tabs';
import {ShoppingListPage}    from '../pages/shopping-list/shopping-list';
import {RecipesPage}         from '../pages/recipes/recipes';
import {RecipePage}          from '../pages/recipe/recipe';
import {EditRecipePage}      from '../pages/edit-recipe/edit-recipe';
import {ShoppingListService} from '../services/shopping-list';
import {RecipeService}       from '../services/recipes';
import {SigninPage}          from '../pages/signin/signin';
import {SignupPage}          from '../pages/signup/signup';
import {AuthService}         from '../services/auth';
import {SLOptionsPage}       from '../pages/shopping-list/sl-options/sl-options';
import {HttpClientModule}    from '@angular/common/http';
import {RecipesOptionsPage}  from '../pages/recipes/recipes-options/recipes-options';
import {IonicStorageModule}  from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    SLOptionsPage,
    RecipesOptionsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    SLOptionsPage,
    RecipesOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingListService,
    RecipeService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
