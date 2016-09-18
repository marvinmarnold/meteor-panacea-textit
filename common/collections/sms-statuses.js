import SmsStatusesSchema from '../schemas/sms-statuses-schema.js';

export const SmsStatuses = new Mongo.Collection("SmsStatuses");
SmsStatuses.attachSchema(SmsStatusesSchema);
