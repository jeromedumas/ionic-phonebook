import { Platform } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Contacts, Contact } from '@ionic-native/contacts';
import { IContact } from './../models/contact.model';
import { Injectable } from '@angular/core';


@Injectable()
export class ContactsService {

  private contactList: IContact[];

  constructor(
    private platform: Platform,
    private contacts: Contacts,
    private sanitizer: DomSanitizer) { }

  private loadContacts() {
    if (this.platform.is('cordova')) {
      // device
      return this.loadNativeContacts();
    } else {
      // web browser
      console.log("Loading fake contacts");
      return this.loadMockContacts();
    }
  }

  private loadMockContacts() {
    this.contactList = [];
    for (var i = 0; i < 20; i++) {
      this.contactList.push({
        displayName: "Mon contact " + i,
        mainPhoneNumber: "06" + Math.random().toString().slice(2, 10),
        mainEmail: "unmail" + i + "@gmail.com",
        profileImage: "assets/imgs/dummy-profile-pic.png"
      });
    }
    return Promise.resolve(this.contactList);
  }
  private loadNativeContacts() {
    return this.contacts.find(
      ['name', 'displayName', 'phoneNumbers', 'emails', 'photos'],
      { multiple: true, hasPhoneNumber: true }
    ).then((data) => {
      this.contactList = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].displayName) {
          this.contactList.push({
            displayName: data[i].displayName,
            mainPhoneNumber: data[i].phoneNumbers && data[i].phoneNumbers.length > 0 ? data[i].phoneNumbers[0].value : '',
            mainEmail: data[i].emails && data[i].emails.length > 0 ? data[i].emails[0].value : '',
            profileImage: this.getProfilImage(data[i]),
          });
        }
      }
      return Promise.resolve(this.contactList);
    });
  }

  public getContacts(): Promise<IContact[]> {
    if (!this.contactList) {
      return this.loadContacts();
    } else {
      return Promise.resolve(this.contactList);
    }
  }

  private getProfilImage(contact: Contact): any {
    let result: any;
    if (contact.photos != null && contact.photos.length > 0 && contact.photos[0].value) {
      console.log(contact.photos[0]);
      result = this.sanitizer.bypassSecurityTrustUrl(contact.photos[0].value);
    } else {
      result = "assets/imgs/dummy-profile-pic.png";
    }
    return result;
  }

}
