import SmsSchema from '../schemas/sms-schema.js';

export const Sms = new Mongo.Collection("Sms");
Sms.attachSchema(SmsSchema);
