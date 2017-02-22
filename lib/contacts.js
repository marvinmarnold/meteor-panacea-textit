import { Contacts } from '../common/collections/contacts.js'

export function getUrnFromTextItCallback(body) {
  let urn = null
	// console.log('getUrnFromTextItCallback');
	// console.log(body);
  // Use default humber if none set or not a RSA number (happens during testing)
  if(body.phone) {
    // console.log("Real manual province locatee");
    urn = body.phone
		urn = urn.replace("+27", 0);
  } else {
    // console.log('Default manual province locatee');
    urn = "+" + Meteor.settings.CELLFIND_LOCATEE
  }

  return urn
}
