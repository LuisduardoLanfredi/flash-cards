import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DeckDetail } from './deck-detail';

@NgModule({
  declarations: [
    DeckDetail,
  ],
  imports: [
    IonicModule.forRoot(DeckDetail),
  ],
  exports: [
    DeckDetail
  ]
})
export class DeckDetailModule {}
