import { Meteor } from 'meteor/meteor';
import { Sms } from '../../common/collections/sms.js';
import { insertOutgoingSms, sendSmsToPanacea } from '../../lib/sms.js';

// Endpoint for Message Terminating (MT), Panacea to user
// GET request with to, from, content query parameters
//
// string username
// string password
// string to
// string text: The body of your message
// string from
// int report_mask: Delivery report request bitmask (see delivery_report_mask_* variables)
// string report_url: URL to call when delivery status changes
// string charset: Character set to use (defaults to UTF-8)
// int data_coding: Data coding (see data_coding_*)
// int message_class: Message class
// int auto_detect_encoding: Auto detect the encoding and send appropriately (useful for sending arabic, hindi, unicode etc messages) 1 = on, 0 = off, defaults off.

const outgoingEndpoint = Meteor.settings.SECRET_TOKEN + "/textit-to-panacea"
Meteor.method(outgoingEndpoint, (to, from, text) => {

  const outgoingSmsId = insertOutgoingSms(to, from, text)
  sendSmsToPanacea(outgoingSmsId);

  return 1;
}, {
  httpMethod: "get",
  getArgsFromRequest(request) {
    // TextIt will structure in the following way
    // http://myservice.com/send.php?from={{from}}&text={{text}}&to={{to}}
    var q = request.query;
    console.log('textit-to-panacea');
    // console.log(q);

    return [ q.to, q.from, q.text ];
  }
});
