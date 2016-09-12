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
