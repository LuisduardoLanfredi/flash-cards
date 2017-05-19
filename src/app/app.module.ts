import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SQLite } from '@ionic-native/sqlite';
import { DeckData } from "../providers/deck-data.provider";
import { CardData } from "../providers/card-data.provider";
import { DeckDetailPage } from "../pages/deck-detail/deck-detail";
import { CardsPage } from "../pages/cards/cards";
import { CardDetailPage } from "../pages/card-detail/card-detail";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DeckDetailPage,
    CardsPage,
    CardDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DeckDetailPage,
    CardsPage,
    CardDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    DeckData,
    CardData,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
