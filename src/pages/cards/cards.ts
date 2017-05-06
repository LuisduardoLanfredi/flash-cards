import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CardModel } from "../../models/card.model";
import { CardData } from "../../providers/card-data.provider";
import { CardDetailPage } from "../card-detail/card-detail";
import { DeckModel } from "../../models/deck.model";

@IonicPage()
@Component({
    selector: 'page-cards',
    templateUrl: 'cards.html',
    styles: [
        `ion-textarea {
            height:100px;
        }`
    ]
})
export class CardsPage {

    private cards: Array<CardModel>;
    private deck: DeckModel;

    constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, public cardData: CardData) {
        this.cards = new Array<CardModel>();
        this.deck = this.navParams.get('deck');

        this.platform.ready().then(() => {
            this.loadCards();
        });
    }

    public loadCards(): void{
         this.cardData.getRows(this.deck.Id).then(data => {
            this.cards = data;
        }).catch(err => {
            console.log('Error!');
        });
    }

    private createNewCard(): void {
        this.navCtrl.push(CardDetailPage, {
            cardsPage: this,
            deck: this.deck
        });
    }

    private editCard(card: CardModel): void {
        this.navCtrl.push(CardDetailPage, {
            cardsPage: this,
            card: card
        })
    }
}
