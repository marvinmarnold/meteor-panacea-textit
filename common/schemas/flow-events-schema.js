export default FlowEventsSchema = new SimpleSchema({
  key: {
    type: String
  },
  value: {
    type: String
  },
  placement: {
    type: String,
    optional:  true
  },
  medium: {
    type: String,
    optional: true
  },
  flowHistoryId: {
    type: String
  },
  contactId: {
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
