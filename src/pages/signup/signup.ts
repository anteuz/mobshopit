import { Component }                                                             from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm}                                                                  from '@angular/forms';
import {AuthService}                                                             from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(form: NgForm) {
    const loadingDialog = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loadingDialog.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(
        data => {
          loadingDialog.dismiss();
        }
      ).catch(
        error => {
          loadingDialog.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Signup failed!',
            message: error.message,
            buttons: ['Ok']
          });
          alert.present();
        }
    );
  }
}
