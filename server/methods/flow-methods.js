import { Meteor } from 'meteor/meteor'
import { Flows } from '../../common/collections/flows.js'

// Endpoint for status updates about MO status updates
// http:://some.thing.com/some.page/some.id&status=%d
const path = Meteor.settings.SECRET_TOKEN + "/flows"
Meteor.method(path, () => {
  return Flows.find().fetch()
}, {
  httpMethod: "get",
  getArgsFromRequest(request) {
    console.log("+++++ FLOWS +++++");

    return [];
  }
})
