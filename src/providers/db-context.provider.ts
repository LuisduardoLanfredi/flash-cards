import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'
import { Platform } from "ionic-angular";

declare var window: any;
@Injectable()
export class DBContext {
    public db = null;
    public readonly _dbName: string = 'flashcards.db';
    constructor() {

    }

    init() {
        this.db = window.sqlitePlugin.openDatabase({ name: this._dbName, location: 'default' });
        this.db.transaction((tx) => {
            tx.executeSql('DROP TABLE Decks');
            tx.executeSql('CREATE TABLE IF NOT EXISTS Decks (Id integer primary key autoincrement, Name text)');
        }, (e) => {
            console.log('Transtion Error', e);
        }, () => {
            console.log('Populated Datebase OK..');
        })
    }
}
