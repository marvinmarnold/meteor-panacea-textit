import ChannelsSchema from '../schemas/channels-schema.js';

export const Channels = new Mongo.Collection("Channels");
Channels.attachSchema(ChannelsSchema);
