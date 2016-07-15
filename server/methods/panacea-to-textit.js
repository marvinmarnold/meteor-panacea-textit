import { Meteor } from 'meteor/meteor';
import { insertIncomingSms, sendSmsToPanacea } from '../../lib/sms.js';

// Endpoint for Message Originating (MO), user to Panacea
// GET request with to, from, content query parameters
//

const incomingEndpoint = Meteor.settings.SECRET_TOKEN + "/panacea-to-textit";
Meteor.method(incomingEndpoint, (to, from, content) => {
  const incomingSmsId = insertIncomingSms({to, from, text})
  sendSmsToTextIt(incomingSmsId);

  return 1;
}, {
  httpMethod: "get",
  getArgsFromRequest(request) {
    console.log(request);

    var q = request.query;

    return [ q.to, q.from, q.content ];
  }
})
