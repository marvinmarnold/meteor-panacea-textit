export default FlowsSchema = new SimpleSchema({
  name: {
    type: String,
  },
  triggers: {
    type: [Object]
  },
  "triggers.$.value": {
    type: String
  },
  "triggers.$.medium": {
      type: String
  },
  "triggers.$.placement": {
      type: String
  },
  textItId: {
    type: String
  }
});
