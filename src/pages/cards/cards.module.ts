import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CardsPage } from './cards';

@NgModule({
  declarations: [
    CardsPage,
  ],
  imports: [
    IonicModule.forRoot(CardsPage),
  ],
  exports: [
    CardsPage
  ]
})
export class CardsModule {}
