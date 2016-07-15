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
  const channel = Channels.findOne({urn: to});
  const contact = Contacts.findOne({urn: from});

  return Sms.insert({
    type: SMS_TYPES.INCOMING,
    channelId: channel._id,
    contactId: contact._id,
    text: text
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

  const query = {
    username: Meteor.settings.PANACEA_USERNAME,
    password: Meteor.settings.PANACEA_PASSWORD,
    to: contact.urn,
    from: channel.urn,
    text: sms.text,
    report_url: reportUrl
  }

  _.each(query, (v, k) => {
    url = url + "&" + k + "=" + v
  });

  HTTP.get(url, {}, (error, result) => {
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
  const url = buildTextItUrl("received")
  //from=%2B250788123123&text=Love+is+patient.+Love+is+kind.&date=2012-04-23T18:25:43.511Z
}

export function sendSentStatusToTextIT(smsId) {

}

export function sendDelieveredStatusToTextIt(smsId) {

}

export function sendFailedStatusToTextIt(smsId) {

}

function buildTextItUrl(action) {
  return Meteor.settings.TEXTIT_ENDPOINT +
    "/" + action + "/" +
    Meteor.settings.TEXTIT_SECRET_TOKEN
}
