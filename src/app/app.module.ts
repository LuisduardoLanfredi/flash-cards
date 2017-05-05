import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SQLite } from '@ionic-native/sqlite';
import { DeckData } from "../providers/deck-data.provider";
import { DBContext } from "../providers/db-context.provider";
import { DeckDetail } from "../pages/deck-detail/deck-detail";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DeckDetail
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DeckDetail
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    DBContext,
    DeckData,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
