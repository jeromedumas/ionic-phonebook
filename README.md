# ionic-phonebook

## Présentation

Nous allons réaliser une application permettant de gérer les contacts d’un périphérique. L’objectif est de proposer une alternative « hybride » à l’application de gestion des contacts proposés par les constructeurs.

## Etapes :

Créer un projet à partir du starter « blank ».

Installer le plugin natif « Contacts ».

Créer une interface model « IContact » (contact.model.ts) contenant les propriétés (displayName, mainPhoneNumber, mainEmail, profileImage).

Créer un provider « ContactsService » (contacts.service.ts) permettant de charger notre base de contacts sur demande.

Remarque : utiliser la méthode bypassSecurityTrustUrl de « DomSanitizer » pour gérer les images des profils.

Créer une page « ContactListPage » (contact-list.page.ts/html/scss) qui liste les contacts.

## Options :

1 - Trier la liste par ordre alphabétique via un Pipe.

2 - Filtrer la liste avec un champ de recherche (utiliser le composant « ion-searchbar »).

3 - Mettre en place une vue détaillée du contact (via attribut « detail-push » sur l’item + Page avec Card).

4 - Permettre de lancer l’appel ou d’envoyer un email depuis la fiche détaillée.

5 - Lancer le GPS sur la sélection de l’adresse du contact (dans la vue détaillée).

6 - Ajouter une vue d’ajout d’un contact (via un « FabButton »).
