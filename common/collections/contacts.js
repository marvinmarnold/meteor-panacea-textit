import ContactsSchema from '../schemas/contacts-schema.js';

export const Contacts = new Mongo.Collection("Contacts");
Contacts.attachSchema(ContactsSchema);
