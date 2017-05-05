import { Injectable } from '@angular/core';
import { DBContext } from "./db-context.provider";
import { DeckModel } from "../models/deck";

@Injectable()
export class DeckData {

    constructor(public dbContext: DBContext) { }

    public addItem(deck: DeckModel) {
        return new Promise<any>(resolve => {
            var InsertQuery = "INSERT INTO Decks (Name) VALUES (?)";
            this
                .dbContext.db
                .executeSql(InsertQuery, [deck.Name], (r) => {
                    console.log('Inserted... Sucess..', deck.Name);
                    this
                        .getRows()
                        .then(s => {
                            resolve(true)
                        });
                }, e => {
                    console.log('Inserted Error', e);
                    resolve(false);
                })
        })
    }

    public updateItem(deck: DeckModel) {
        return new Promise<any>(resolve => {
            var InsertQuery = "UPDATE Decks SET Name = ? WHERE Id = ?";
            this
                .dbContext.db
                .executeSql(InsertQuery, [deck.Name, deck.Id], (r) => {
                    console.log('Updated... Sucess..', deck.Name);
                    this
                        .getRows()
                        .then(s => {
                            resolve(true)
                        });
                }, e => {
                    console.log('Inserted Error', e);
                    resolve(false);
                })
        })
    }

    public deleteItem(deck: DeckModel) {
        return new Promise<any>(resolve => {
            var InsertQuery = "Delete FROM Decks WHERE Id = ?";
            this
                .dbContext.db
                .executeSql(InsertQuery, [deck.Id], (r) => {
                    console.log('Deleted... Sucess..', deck.Name);
                    this
                        .getRows()
                        .then(s => {
                            resolve(true)
                        });
                }, e => {
                    console.log('Inserted Error', e);
                    resolve(false);
                })
        })
    }

    public getRows() {
        return new Promise<Array<DeckModel>>(res => {
            let arr: Array<DeckModel> = new Array<DeckModel>();
            let query = "SELECT Id, Name FROM Decks";
            this.dbContext.db.executeSql(query, [], rs => {
                if (rs.rows.length > 0) {
                    for (var i = 0; i < rs.rows.length; i++) {
                        var item = rs
                            .rows
                            .item(i);

                            arr
                            .push(item);
                    }
                }
                res(arr);
            }, (e) => {
                console.log('Sql Query Error', e);
            });
        })



    }
    //to delete any Item
    // del(id) {
    //     return new Promise(resolve => {
    //         var query = "DELETE FROM Todo WHERE id=?";
    //         this
    //             .dbContext.db
    //             .executeSql(query, [id], (s) => {
    //                 console.log('Delete Success...', s);
    //                 this
    //                     .getRows()
    //                     .then(s => {
    //                         resolve(true);
    //                     });
    //             }, (err) => {
    //                 console.log('Deleting Error', err);
    //             });
    //     })

    // }
    // //to Update any Item
    // update(id, txt) {
    //     return new Promise(res => {
    //         var query = "UPDATE Todo SET todoItem=?  WHERE id=?";
    //         this
    //             .dbContext.db
    //             .executeSql(query, [
    //                 txt, id
    //             ], (s) => {
    //                 console.log('Update Success...', s);
    //                 this
    //                     .getRows()
    //                     .then(s => {
    //                         res(true);
    //                     });
    //             }, (err) => {
    //                 console.log('Updating Error', err);
    //             });
    //     })

    // }
}
