import { Meteor } from 'meteor/meteor';
import { insertIncomingSms, sendSmsToTextIt, watchForTrigger } from '../../lib/sms.js';

// Endpoint for Message Originating (MO), user to Panacea
// GET request with to, from, content query parameters
//
const incomingEndpoint = Meteor.settings.SECRET_TOKEN + "/panacea-to-textit";
Meteor.method(incomingEndpoint, (to, from, text) => {
  const incomingSmsId = insertIncomingSms(to, from, text)
	console.log("Received a message from Panacea. From: " + from + ", to: " + to + ", text: " + text);
  sendSmsToTextIt(incomingSmsId);
  watchForTrigger(incomingSmsId);

  return 1;
}, {
  httpMethod: "get",
  getArgsFromRequest(request) {
    var q = request.query;
		// console.log("Sending message to TextIt");
		// console.log(q);

    return [ q.to, q.from, q.message ];
  }
})
