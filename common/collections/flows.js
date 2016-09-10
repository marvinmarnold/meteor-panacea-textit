import FlowsSchema from '../schemas/flows-schema.js';

export const Flows = new Mongo.Collection("Flows");
Flows.attachSchema(FlowsSchema);
