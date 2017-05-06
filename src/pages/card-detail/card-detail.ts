import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardModel } from "../../models/card.model";
import { CardData } from "../../providers/card-data.provider";
import { DeckModel } from "../../models/deck.model";

@IonicPage()
@Component({
    selector: 'page-card-detail',
    templateUrl: 'card-detail.html',
})
export class CardDetailPage {

    private cardModel: CardModel;
    private deckModel: DeckModel;
    private test: string = "AA";

    constructor(public navCtrl: NavController, public navParams: NavParams, public cardData: CardData) {
        this.cardModel = new CardModel();
        this.cardModel.Deck = this.navParams.get('deck');;
    }

    private saveCard() : void {
        this.cardData.addItem(this.cardModel);
    }
}
