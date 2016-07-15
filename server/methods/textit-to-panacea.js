import { Meteor } from 'meteor/meteor';

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

Meteor.method(Meteor.settings.SECRET_TOKEN + "/textit-to-panacea", (to, from, content) => {
  console.log('textit-to-panacea');

  let url = Meteor.settings.PANACEA_ENDPOINT + "/json?action=message_send"

  const reportUrl = Meteor.settings.galaxy.meteor.com.env.ROOT_URL +
    Meteor.settings.SECRET_TOKEN +
    "/panacea-status-update"

  const query = {
    username: Meteor.settings.PANACEA_USERNAME,
    password: Meteor.settings.PANACEA_PASSWORD,
    to: to,
    from: from,
    text: content,
    report_url: reportUrl
  }

  _.each(query, (v, k) => {
    url = url + "&" + k + "=" + v
  });

  console.log(url);



  HTTP.get(url, {}, (error, result) => {
    if(error) {
      console.log("error", error);
    }
    if(result) {
      console.log('got some result');
      console.log(result);
    }
  });
  return 1;
}, {
  httpMethod: "get",
  getArgsFromRequest(request) {
    // TextIt will structure in the following way
    // http://myservice.com/send.php?from={{from}}&text={{text}}&to={{to}}
    var q = request.query;

    return [ q.to, q.from, q.text ];
  }
})
