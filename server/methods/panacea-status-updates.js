import { Meteor } from 'meteor/meteor';

// Endpoint for status updates about MO status updates
// http:://some.thing.com/some.page/some.id&status=%d
Meteor.method(Meteor.settings.SECRET_TOKEN + "/panacea-status-updates", (to, from, content) => {
  // console.log(to);
  return 1;
}, {
  httpMethod: "get",
  getArgsFromRequest(request) {
    console.log('panacea-status-updates');
    // console.log(request);

    console.log('params');
    console.log(request.params);
    var q = request.query;

    return ["A", "B", "C"]
    // return [ q.to, q.from, q.content ];
  }
})
