import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CardModel } from "../../models/card.model";
import { CardData } from "../../providers/card-data.provider";
import { DeckModel } from "../../models/deck.model";
import { CardsPage } from "../cards/cards";

@IonicPage()
@Component({
    selector: 'page-card-detail',
    templateUrl: 'card-detail.html',
})
export class CardDetailPage {

    private cardModel: CardModel;
    private deckModel: DeckModel;
    private isCreation: boolean = false;
    private cardsPage: CardsPage;

    constructor(public navCtrl: NavController, public navParams: NavParams, public cardData: CardData, public alertCtrl: AlertController) {
        this.cardModel = this.navParams.get('card');
        this.cardsPage = this.navParams.get('cardsPage');

        if (!this.cardModel) {
            this.cardModel = new CardModel();
            this.cardModel.Deck = this.navParams.get('deck');
            this.isCreation = true;
        }
    }

    private saveCard(): void {
        if (!this.isValid()) {
            let alert = this.alertCtrl.create({
                title: 'Invalid Card!',
                subTitle: 'You must provide a valid Card.',
                buttons: ['OK']
            });
            alert.present();
            return;
        }

        let operation: Promise<any>;

        if (this.isCreation)
            operation = this.cardData.addItem(this.cardModel);
        else
            operation = this.cardData.updateItem(this.cardModel);

        operation.then(s => {
            console.log(this.cardsPage);
            this.cardsPage.loadCards();
            //this.homePage.footerDisplay = 'hidden';
            this.navCtrl.pop()
        }).catch(err => {
            console.log('Error!');
        });
    }

     private isValid(): boolean {
        if (!this.cardModel.Front || !this.cardModel.Back)
            return false;

        return true;
    }
}
