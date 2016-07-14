import { Meteor } from 'meteor/meteor';

// Endpoint for Message Originating (MO)
// GET request with to, from, content query parameters
//
Meteor.method("panacea-to-textit", (to, from, content) => {
  console.log('hit method');
  console.log(to);
  return 1;
}, {
  httpMethod: "get",
  getArgsFromRequest(request) {

    var q = request.query;

    return [ q.to, q.from, q.content ];
  }
})
