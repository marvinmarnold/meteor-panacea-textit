import { Meteor } from 'meteor/meteor';
import { insertIncomingSms, sendSmsToTextIt, watchForTrigger } from '../../lib/sms.js';

// Endpoint for Message Originating (MO), user to Panacea
// GET request with to, from, content query parameters
//
const incomingEndpoint = Meteor.settings.SECRET_TOKEN + "/panacea-to-textit";
Meteor.method(incomingEndpoint, (to, from, text) => {
  const incomingSmsId = insertIncomingSms(to, from, text)
  sendSmsToTextIt(incomingSmsId);
  watchForTrigger(incomingSmsId);

  return 1;
}, {
  httpMethod: "get",
  getArgsFromRequest(request) {
    console.log('panacea-to-textit');

    var q = request.query;
    // console.log(q);

    return [ q.to, q.from, q.message ];
  }
})
