import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DeckModel } from "../../models/deck";
import { DeckData } from "../../providers/deck-data.provider";
import { DeckDetail } from "../deck-detail/deck-detail";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    private decks: Array<DeckModel>;

    constructor(public navCtrl: NavController, public platform: Platform, public deckData: DeckData) {
        this.decks = new Array<DeckModel>();

        this.platform.ready().then(() => {
            this.loadDecks();
        });
    }

    public loadDecks(): void {
        this.deckData.getRows().then(data => {
            this.decks = data;
        }).catch(err => {
            console.log('Error!');
        });
    }

    public createDeck(): void {
        this.navCtrl.push(DeckDetail, {
            homePage: this
        });
    }

    public editDeck(deck: DeckModel): void{
        this.navCtrl.push(DeckDetail, {
            homePage: this,
            deck: deck
        });
    }
}
