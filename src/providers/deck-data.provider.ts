import { Injectable } from '@angular/core';
import { DeckModel } from "../models/deck.model";
import { SqlStorage } from "./sql-storage.provider";

@Injectable()
export class DeckData {

    storage: SqlStorage;

    constructor() {
        this.storage = new SqlStorage();
    }

    public addItem(deck: DeckModel) {
        let query = "INSERT INTO Decks (Name) VALUES (?)";
        return this.storage.query(query, [deck.Name]);
    }

    public updateItem(deck: DeckModel) {
        var query = "UPDATE Decks SET Name = ? WHERE Id = ?";
        return this.storage.query(query, [deck.Name, deck.Id]);
    }

    public deleteItem(id: number) {
        var query = "DELETE FROM Decks WHERE Id = ?";
        return this.storage.query(query, [id]);
    }

    public async getRows(): Promise<Array<DeckModel>> {
        let data: Array<DeckModel> = new Array<DeckModel>();
        var query = "SELECT Id, Name FROM Decks";
        let sqlResult = await this.storage.query(query, []);

        for (let i = 0; i < sqlResult.res.rows.length; i++) {
            data.push(sqlResult.res.rows.item(i));
        }
        return data;
    }
}
