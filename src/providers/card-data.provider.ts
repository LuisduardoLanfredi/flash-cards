import { Injectable } from '@angular/core';
import { DBContext } from "./db-context.provider";
import { CardModel } from "../models/card.model";

@Injectable()
export class CardData {

    constructor(public dbContext: DBContext) { }

    public addItem(card: CardModel) {
        return new Promise<any>(resolve => {
            var InsertQuery = "INSERT INTO Cards (Front, Back, Deck_Id) VALUES (?, ?, ?)";
            this
                .dbContext.db
                .executeSql(InsertQuery, [card.Front, card.Back, card.Deck.Id], (r) => {
                    console.log('Inserted... Sucess..');
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

    // public updateItem(deck: DeckModel) {
    //     return new Promise<any>(resolve => {
    //         var InsertQuery = "UPDATE Decks SET Name = ? WHERE Id = ?";
    //         this
    //             .dbContext.db
    //             .executeSql(InsertQuery, [deck.Name, deck.Id], (r) => {
    //                 console.log('Updated... Sucess..', deck.Name);
    //                 this
    //                     .getRows()
    //                     .then(s => {
    //                         resolve(true)
    //                     });
    //             }, e => {
    //                 console.log('Inserted Error', e);
    //                 resolve(false);
    //             })
    //     })
    // }

    // public deleteItem(deck: DeckModel) {
    //     return new Promise<any>(resolve => {
    //         var InsertQuery = "Delete FROM Decks WHERE Id = ?";
    //         this
    //             .dbContext.db
    //             .executeSql(InsertQuery, [deck.Id], (r) => {
    //                 console.log('Deleted... Sucess..', deck.Name);
    //                 this
    //                     .getRows()
    //                     .then(s => {
    //                         resolve(true)
    //                     });
    //             }, e => {
    //                 console.log('Inserted Error', e);
    //                 resolve(false);
    //             })
    //     })
    // }

    public getRows() {
        return new Promise<Array<CardModel>>(res => {
            let arr: Array<CardModel> = new Array<CardModel>();
            let query = "SELECT Id, Front, Back, Deck_Id FROM Cards";
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
    // //to delete any Item
    // // del(id) {
    // //     return new Promise(resolve => {
    // //         var query = "DELETE FROM Todo WHERE id=?";
    // //         this
    // //             .dbContext.db
    // //             .executeSql(query, [id], (s) => {
    // //                 console.log('Delete Success...', s);
    // //                 this
    // //                     .getRows()
    // //                     .then(s => {
    // //                         resolve(true);
    // //                     });
    // //             }, (err) => {
    // //                 console.log('Deleting Error', err);
    // //             });
    // //     })

    // // }
    // // //to Update any Item
    // // update(id, txt) {
    // //     return new Promise(res => {
    // //         var query = "UPDATE Todo SET todoItem=?  WHERE id=?";
    // //         this
    // //             .dbContext.db
    // //             .executeSql(query, [
    // //                 txt, id
    // //             ], (s) => {
    // //                 console.log('Update Success...', s);
    // //                 this
    // //                     .getRows()
    // //                     .then(s => {
    // //                         res(true);
    // //                     });
    // //             }, (err) => {
    // //                 console.log('Updating Error', err);
    // //             });
    // //     })

    // // }
}