import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { DBContext } from "../providers/db-context.provider";
import { SqlStorage } from "../providers/task.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = HomePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbContext: DBContext) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
            dbContext.init();
        });
    }
}
