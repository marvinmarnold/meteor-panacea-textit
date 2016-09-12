import { SMS_TYPES } from '../../lib/constants.js';

export default SmsSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: _.values(SMS_TYPES)
  },
  channelId: {
    type: String
  },
  contactId: {
    type: String
  },
  text: {
    type: String
  },
  pushedAt: {
    type: Date,
    optional: true
  },
  sentAt: {
    type: Date,
    optional: true
  },
  deliveredAt: {
    type: Date,
    optional: true
  },
  failedAt: {
    type: Date,
    optional: true
  },
  receivedAt: {
    type: Date,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset();
      }
    }
  }
});
