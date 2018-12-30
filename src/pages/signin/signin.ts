import { Component }                                                             from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm}                                                                  from '@angular/forms';
import {AuthService}                                                             from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSignin(form: NgForm) {
    const loadingDialog = this.loadingCtrl.create({
      content: "Signing you in..."
    });

    loadingDialog.present();

    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        loadingDialog.dismiss();
      }
      )
      .catch(error => {
        loadingDialog.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signing failed!',
          message: error.message,
          buttons :['Ok']
        });
        alert.present();
      });

  }
}
