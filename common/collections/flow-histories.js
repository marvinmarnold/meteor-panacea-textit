import FlowHistoriesSchema from '../schemas/flow-histories-schema.js';

export const FlowHistories = new Mongo.Collection("FlowHistories");
FlowHistories.attachSchema(FlowHistoriesSchema);
