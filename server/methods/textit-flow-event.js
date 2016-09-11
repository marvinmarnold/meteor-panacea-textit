import { Meteor } from 'meteor/meteor';
import { Flows } from '../../common/collections/flows.js';
import { FlowEvents } from '../../common/collections/flow-events.js';
import { FlowHistories } from '../../common/collections/flow-histories.js';
import { Sms } from '../../common/collections/sms.js';
import { insertOutgoingSms, sendSmsToPanacea } from '../../lib/sms.js';

const eventEndpoint = Meteor.settings.SECRET_TOKEN + "/textit-flow-event"
Meteor.method(eventEndpoint, (textItId, contactNumber, values) => {
  const flow = Flows.findOne({textItId})
  if(flow) {
    const flowHistory = FlowHistories.findOne({flowId: flow._id, contactNumber}, {sort: {createdAt: -1}})
    if(flowHistory) {
      _.each(values, v => {
        const args = {
          key: v.label,
          value: v.category.base,
          flowHistoryId: flowHistory._id
        }
        const existingEvent = FlowEvents.findOne(args)

        if(!existingEvent) {
          return FlowEvents.insert(args)
        }
      })
    } else {
      console.log("Could not find FlowHistory with flowId " + flow._id);
    }
  } else {
    console.log("Could not find Flow with textItId " + textItId);
  }

}, {
  httpMethod: "post",
  getArgsFromRequest(request) {
    console.log('textit-flow-event');
    if(request.body) {
      const body = request.body
      const res = [body.flow, body.phone, JSON.parse(body.values)]
      return res
    }

    return null;
  }
});
