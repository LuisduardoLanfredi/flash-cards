import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CardDetailPage } from './card-detail';

@NgModule({
  declarations: [
    CardDetailPage,
  ],
  imports: [
    IonicModule.forRoot(CardDetailPage),
  ],
  exports: [
    CardDetailPage
  ]
})
export class CardDetailModule {}
