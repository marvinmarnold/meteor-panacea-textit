import { Meteor } from 'meteor/meteor';

// Endpoint for status updates about MO status updates
// http:://some.thing.com/some.page/some.id&status=%d
Meteor.method(Meteor.settings.SECRET_TOKEN + "/panacea-status-updates", (to, from, content) => {
  console.log(to);
  return 1;
}, {
  httpMethod: "get",
  getArgsFromRequest(request) {

    var q = request.query;

    return [ q.to, q.from, q.content ];
  }
})
