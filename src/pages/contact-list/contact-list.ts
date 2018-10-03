
import { IonicPage } from 'ionic-angular';
import { ContactsService } from './../../providers/contacts-service';
import { IContact } from './../../models/contact.model';
import { Component } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html',
})
export class ContactListPage {

  private loading: Loading;
  public contacts: IContact[];

  constructor(
    private contactsSvc: ContactsService,
    private loadingCtrl: LoadingController
  ) { }

  ionViewDidLoad() {
    this.presentLoading();
    this.contactsSvc.getContacts().then(contacts => {
      this.contacts = contacts;
      this.loading.dismiss();
    }).catch(() => this.loading.dismiss());
  }

  private presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Chargement des contacts...'
    });

    this.loading.present();
  }

}
