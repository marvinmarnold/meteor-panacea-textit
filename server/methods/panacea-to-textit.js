import { Meteor } from 'meteor/meteor';

// Endpoint for Message Originating (MO), user to Panacea
// GET request with to, from, content query parameters
//
Meteor.method(Meteor.settings.SECRET_TOKEN + "/panacea-to-textit", (to, from, content) => {
  console.log(to);
  return 1;
}, {
  httpMethod: "get",
  getArgsFromRequest(request) {

    var q = request.query;

    return [ q.to, q.from, q.content ];
  }
})
