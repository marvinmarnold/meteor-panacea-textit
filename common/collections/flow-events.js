import FlowEventsSchema from '../schemas/flow-events-schema.js';

export const FlowEvents = new Mongo.Collection("FlowEvents");
FlowEvents.attachSchema(FlowEventsSchema);
