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
            //tx.executeSql('DROP TABLE Cards');
            //tx.executeSql('DROP TABLE Decks');

            tx.executeSql('PRAGMA foreign_keys = ON');

            tx.executeSql(`CREATE TABLE IF NOT EXISTS Decks
                            (
                                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                                Name VARCHAR(25) NOT NULL
                            )`);

            tx.executeSql(`CREATE TABLE IF NOT EXISTS Cards (
                                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                                Deck_Id INT NOT NULL,
                                Front TEXT NOT NULL,
                                Back TEXT NOT NULL,
                                FOREIGN KEY (Deck_Id) REFERENCES Decks(Id)
                            )`);
        }, (e) => {
            console.log('Transtion Error', e);
        }, () => {
            console.log('Populated Datebase OK..');
        })
    }
}
