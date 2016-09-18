import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../common/collections/contacts.js';
import { Flows } from '../../common/collections/flows.js';
import { FlowEvents } from '../../common/collections/flow-events.js';
import { FlowHistories } from '../../common/collections/flow-histories.js';
import { Sms } from '../../common/collections/sms.js';
import { insertOutgoingSms, sendSmsToPanacea } from '../../lib/sms.js';

const eventEndpoint = Meteor.settings.SECRET_TOKEN + "/textit-flow-event"
Meteor.method(eventEndpoint, (textItId, contactNumber, values) => {
  const flow = Flows.findOne({textItId})
  if(flow) {
    let flowHistory = FlowHistories.findOne({flowId: flow._id, contactNumber}, {sort: {createdAt: -1}})
    if(!flowHistory) {
      console.log("Could not find FlowHistory with flowId " + flow._id);
      let contact = Contacts.findOne({urn: contactNumber});

      if(!contact) {
        const contactId = Contacts.insert({urn: contactNumber})
        contact = Contacts.findOne(contactId)
      }

      const flowHistoryId = FlowHistories.insert({
        flowId: flow._id,
        contactNumber,
        contactId: contact._id,
        createdAt: new Date()
      })

      flowHistory = FlowHistories.findOne(flowHistoryId)
    }

    _.each(values, v => {
      let args = {
        key: v.label,
        flowHistoryId: flowHistory._id
      }

      // Normally, we want to store the sanitized values
      // but for cities, we want the raw input from the user
      if(v.label === "manual_city") {
        args["value"] = v.text
      } else {
        args["value"] = v.category.base
      }

      const existingEvent = FlowEvents.findOne(args)

      if(!existingEvent) {
        return FlowEvents.insert(args)
      }
    })
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
