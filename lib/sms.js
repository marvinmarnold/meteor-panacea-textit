import { Channels } from '../common/collections/channels.js';
import { Contacts } from '../common/collections/contacts.js';
import { Sms } from '../common/collections/sms.js';

import { SMS_TYPES } from './constants';

export function insertOutgoingSms(to, from, text) {
  const channel = Channels.findOne({urn: from});
  const contact = Contacts.findOne({urn: to});

  return Sms.insert({
    type: SMS_TYPES.OUTGOING,
    channelId: channel._id,
    contactId: contact._id,
    text: text
  })
}

export function insertIncomingSms(to, from, text) {
  console.log(to, from, text);
  const channel = Channels.findOne({urn: to});
  let contact = Contacts.findOne({urn: from});

  if(!contact) {
    Contacts.insert({urn: from});
  }

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

  let url = Meteor.settings.PANACEA_ENDPOINT + "/json?action=message_send"

  const reportUrl = Meteor.settings.galaxy.meteor.com.env.ROOT_URL +
    Meteor.settings.SECRET_TOKEN +
    "/panacea-status-update"

  const params = {
    username: Meteor.settings.PANACEA_USERNAME,
    password: Meteor.settings.PANACEA_PASSWORD,
    to: contact.urn,
    from: channel.urn,
    text: sms.text,
    report_url: reportUrl
  }

  HTTP.get(url, {params}, (error, result) => {
    if(error) {
      console.log("error", error);
      // TODO send error status to TextIt
      // TODO update failedAt
    }
    if(result) {
      console.log('got some result');
      console.log(result);
      // TODO update pushed at
    }
  });
}

export function sendSmsToTextIt(smsId) {
  const sms = Sms.findOne(smsId);
  const contact = Contacts.findOne(sms.contactId);

  const url = buildTextItUrl(sms.channelId, "received")

  const params = {
    from: contact.urn,
    text: sms.text,
    date: sms.receivedAt.toISOString()
  }

  console.log('going to post to ' + url);
  HTTP.post(url, {params}, (error, result) => {
    if(error) {
      console.log('error posting to textit');
      console.log(error);
    } else {
      console.log('success posting to textit');
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
    channel.textItToken + "/"
}