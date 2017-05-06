import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DeckDetailPage } from './deck-detail';

@NgModule({
  declarations: [
    DeckDetailPage,
  ],
  imports: [
    IonicModule.forRoot(DeckDetailPage),
  ],
  exports: [
    DeckDetailPage
  ]
})
export class DeckDetailModule {}
