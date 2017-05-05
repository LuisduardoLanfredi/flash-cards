import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { DeckModel } from "../../models/deck";
import { DeckData } from "../../providers/deck-data.provider";

@IonicPage()
@Component({
    selector: 'page-deck-detail',
    templateUrl: 'deck-detail.html',
})
export class DeckDetail {

    private homePage: HomePage;
    private deckModel: DeckModel;
    private isCreation: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public deckData: DeckData, public alertCtrl: AlertController) {
        this.homePage = this.navParams.get('homePage');
        this.deckModel = this.navParams.get('deck');

        if (!this.deckModel) {
            this.deckModel = new DeckModel();
            this.isCreation = true;
        }
    }

    private saveDeck(): void {
        if (!this.isValid()) {
            let alert = this.alertCtrl.create({
                title: 'Invalid Name!',
                subTitle: 'You must provide a valid name.',
                buttons: ['OK']
            });
            alert.present();
            return;
        }

        let operation: Promise<any>;

        if (this.isCreation)
            operation = this.deckData.addItem(this.deckModel);
        else
            operation = this.deckData.updateItem(this.deckModel);

        operation.then(s => {
            this.homePage.loadDecks();
            this.navCtrl.pop()
        }).catch(err => {
            console.log('Error!');
        });
    }

    public deleteDeck(): void {

        let confirm = this.alertCtrl.create({
            title: 'Delete this deck?',
            message: 'Deleting this deck you are going to delete all releated cards together.',
            buttons: [
                {
                    text: 'Proceed',
                    handler: () => {
                        this.deckData.deleteItem(this.deckModel).then(s => {
                            this.homePage.loadDecks();
                            this.navCtrl.pop()
                        }).catch(err => {
                            console.log('Error!');
                        });
                    }
                },
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Canceled.');
                    }
                }
            ]
        });

        confirm.present();
    }

    private isValid(): boolean {
        if (!this.deckModel.Name)
            return false;

        return true;
    }
}
