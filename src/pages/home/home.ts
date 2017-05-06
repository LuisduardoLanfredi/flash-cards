import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DeckModel } from "../../models/deck.model";
import { DeckData } from "../../providers/deck-data.provider";
import { DeckDetailPage } from "../deck-detail/deck-detail";
import { CardDetailPage } from "../card-detail/card-detail";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    styles: [`
        .footer {
            /*background-color: #fff;*/
        }
        ion-item:hover {
            background-color: #f3f3f3;
        }
        `
    ]
})

export class HomePage {
    private decks: Array<DeckModel>;
    private selectedDeck: DeckModel;
    public footerDisplay: string = 'hidden';

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

    private createDeck(): void {
        this.navCtrl.push(DeckDetailPage, {
            homePage: this
        });
    }

    private openMenu(deck: DeckModel): void {
        this.selectedDeck = deck;
        this.footerDisplay = 'visible';
    }

    private openDeckDetailPage() : void {
        this.navCtrl.push(DeckDetailPage, {
            homePage: this,
            deck: this.selectedDeck
        });
    }

    private openCardsPage() : void {
        this.navCtrl.push(CardDetailPage, {
            homePage: this,
            deck: this.selectedDeck
        });
    }
}
