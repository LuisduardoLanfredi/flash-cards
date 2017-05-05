import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { DBContext } from "../providers/db-context.provider";

platformBrowserDynamic().bootstrapModule(AppModule);
