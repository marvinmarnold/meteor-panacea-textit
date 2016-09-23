import '../common/collections/contacts.js'

// TODO could be done with upsert
export function findOrInsertContact(urn) {
  // Find contact URN belongs to
  let contact = Contacts.findOne({urn});

  // Only required in testing mode.
  // Otherwise Contacts should already have been created from inbound messages.
  if(!contact) {
    const contactId = Contacts.insert({urn});
    contact = Contacts.findOne(contactId);
  }

  return contact
}

export function getUrnFromTextItCallback(body) {
  let urn = null

  // Use default humber if none set or not a RSA number (happens during testing)
  if(body.phone && (body.phone.substr(0, 3) === "+27")) {
    console.log("Real manual province locatee");
    urn = body.phone
  } else {
    console.log('Default manual province locatee');
    urn = "+" + Meteor.settings.CELLFIND_LOCATEE
  }

  return urn
}
