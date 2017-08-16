import { Channels } from '../common/collections/channels.js'
import { Contacts } from '../common/collections/contacts.js'
import { FlowEvents } from '../common/collections/flow-events.js'
import { FlowHistories } from '../common/collections/flow-histories.js'
import { Flows } from '../common/collections/flows.js'
import { Sms } from '../common/collections/sms.js'

import { SMS_TYPES } from './constants'

export function watchForTrigger(incomingSmsId) {
  const sms = Sms.findOne(incomingSmsId)

  if(sms) {
    const text = sms.text
    const [flowId, trigger] = flowIdForTrigger(text)
    if(flowId) {
      const contact = Contacts.findOne(sms.contactId)

			if(!contact) {
				console.log("Could not find an SMS sent from this contact. Skipping.");
			}

      const flowHistoryId = FlowHistories.insert({
        flowId,
        contactId: contact._id,
        contactNumber: contact.urn,
        createdAt: new Date()
      })

      if(flowHistoryId) {
        const event = {
          key: "trigger",
          value: trigger.value,
          medium: trigger.medium,
          placement: trigger.placement,
          flowHistoryId,
          contactId: contact._id,
					timestamp: new Date()
        }

        FlowEvents.insert(event)
      }
    }
  }
}

// Return [flowId, triggerString] of first Flow that has a trigger matching the beginning of text
const flowIdForTrigger = (text) => {
  const flows = Flows.find().fetch()
  let breakFlows = false
  let _flowId = null, _trigger = null

  _.each(flows, flow => {
    if(breakFlows)
      return
    _.each(flow.triggers, trigger => {
      const value = trigger.value.toLowerCase()
      const regex = "^\s*" + value

      const match = text.toLowerCase().search(regex)
      if(match >= 0) {
        _flowId = flow._id
        _trigger = trigger
        breakFlows = true
        return
      }
    })
  })
  return [_flowId , _trigger]
}

export function insertOutgoingSms(to, from, text) {
	// console.log('insertOutgoingSms');
	// console.log(to);
	// console.log(from);
	let urn = from.replace("+27", "0");
	urn = urn.replace("+","");

	to = to.replace("+27", "0");
	to = to.replace("+","");
  const channel = Channels.findOne({urn});
  const contact = findOrNewContact(to)

  return Sms.insert({
    type: SMS_TYPES.OUTGOING,
    channelId: channel._id,
    contactId: contact._id,
    text: text
  })
}

export const findOrNewContact = (urn) => {
	// console.log('findOrNewContact');
	// console.log(urn);
	urn = urn.replace("+27", "0");
	urn = urn.replace("+", "");
	// console.log(urn);
  let contact = Contacts.findOne({urn});

  if(!contact) {
    const contactId = Contacts.insert({urn});
    contact = Contacts.findOne(contactId);
  }

  return contact
}

export function sendSms(to, from, text) {
  const outgoingSmsId = insertOutgoingSms(to, from, text)
  sendSmsToPanacea(outgoingSmsId);
}

export function insertIncomingSms(to, from, text) {
  const channel = Channels.findOne({urn: to});
  const contact = findOrNewContact(from)

  return Sms.insert({
    type: SMS_TYPES.INCOMING,
    channelId: channel._id,
    contactId: contact._id,
    text: text,
    receivedAt: new Date()
  })
}

export function sendSmsToPanacea(smsId) {
  const sms = Sms.findOne(smsId);
  const channel = Channels.findOne(sms.channelId);
  const contact = Contacts.findOne(sms.contactId);

  let url = Meteor.settings.PANACEA_ENDPOINT + "/json"

  const reportUrl = Meteor.settings.ROOT_URL + "/methods/" +
    Meteor.settings.SECRET_TOKEN +
    "/panacea-status-updates/" +
    sms._id + "/?status=%d"

  const params = {
    action: "message_send",
    username: Meteor.settings.PANACEA_USERNAME,
    password: Meteor.settings.PANACEA_PASSWORD,
    to: contact.urn,
    from: channel.urn,
    text: sms.text,
    report_url: reportUrl,
    // 1 - delivered
    // 2 - undelivered
    // 4 - queued at network
    // 8 - sent to network
    // 16 - failed at network
    report_mask: 31 // 1 + 2 + 4 + 8 + 16
  }

  HTTP.get(url, {params}, (error, result) => {
    if(error) {
      console.log("error", error);
      // TODO send error status to TextIt
      // TODO update failedAt
    }
    if(result) {
      // TODO update pushed at
    }
  });
}

export function sendSmsToTextIt(smsId) {
  const sms = Sms.findOne(smsId);
  const contact = Contacts.findOne(sms.contactId);
  const url = buildTextItUrl("default", "received")

  const params = {
    from: contact.urn,
    text: sms.text,
    date: sms.receivedAt.toISOString()
  }

  // console.log('going to post to ' + url);
  HTTP.post(url, {params}, (error, result) => {
    if(error) {
      console.log('error posting to textit');
      console.log(error);
    } else {
      // console.log('success posting to textit');
    }
  });
}

export function sendSentStatusToTextIT(smsId) {

}

export function sendDelieveredStatusToTextIt(smsId) {

}

export function sendFailedStatusToTextIt(smsId) {

}

function buildTextItUrl(channelId, action) {
  const channel = Channels.findOne(channelId);

  return Meteor.settings.TEXTIT_ENDPOINT +
    "/" + action + "/" +
    Meteor.settings.CHANNELS[0].textItToken + "/"
}
