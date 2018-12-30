import {Component}      from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
  selector: 'page-sl-options',
  template: `
  <ion-grid text-center>
    <ion-row>
      <ion-col>
        <h3>Store & Load</h3>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <button ion-button outline (click)="onAction('load')">Load list</button>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <button ion-button outline (click)="onAction('store')">Store list</button>
      </ion-col>
    </ion-row>
  </ion-grid>
  `

})
export class SLOptionsPage {

  constructor(private viewCtrl: ViewController) {}

  onAction(action: string) {
    this.viewCtrl.dismiss({action: action});
  }
}
