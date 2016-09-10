import { Meteor } from 'meteor/meteor';
import { FlowEvents } from '../../common/collections/flow-events.js';
import { Sms } from '../../common/collections/sms.js';
import { insertOutgoingSms, sendSmsToPanacea } from '../../lib/sms.js';

const eventEndpoint = Meteor.settings.SECRET_TOKEN + "/textit-flow-event"
Meteor.method(eventEndpoint, (flowId, key, value) => {

  return FlowEvents.insert({ flowId, key, value})

}, {
  httpMethod: "post",
  getArgsFromRequest(request) {
    console.log('textit-flow-event');
    console.log(request.query);

    console.log('params');
    console.log(request.params);

    var q = request.query;
    console.log('textit-to-panacea');
    // console.log(q);

    return [ "a", "b", "c"];
  }
});
