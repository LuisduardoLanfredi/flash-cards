import { Injectable } from '@angular/core';
import { CardModel } from "../models/card.model";
import { DeckModel } from "../models/deck.model";
import { SqlStorage } from "./sql-storage.provider";

@Injectable()
export class CardData {

    storage: SqlStorage;

    constructor() {
        this.storage = new SqlStorage();
    }

    public addItem(card: CardModel) {
        let query = "INSERT INTO Cards (Front, Back, Deck_Id) VALUES (?, ?, ?)";
        return this.storage.query(query, [card.Front, card.Back, card.Deck.Id]);
    }

    public updateItem(card: CardModel) {
        let query = "UPDATE Cards SET Front = ?, Back = ? WHERE Id = ?";
        return this.storage.query(query, [card.Front, card.Back, card.Id]);
    }

    public deleteItem(id: number) {
        var query = "DELETE FROM Cards WHERE Id = ?";
        return this.storage.query(query, [id]);
    }

    public async getRows(deckId: number): Promise<Array<CardModel>> {
        let data: Array<CardModel> = new Array<CardModel>();
        var query = "SELECT Id, Front, Back, Deck_Id FROM Cards WHERE Deck_Id = ?";
        let sqlResult = await this.storage.query(query, [deckId]);

        for (let i = 0; i < sqlResult.res.rows.length; i++) {
            data.push(sqlResult.res.rows.item(i));
        }
        return data;
    }
}
