export default FlowHistoriesSchema = new SimpleSchema({
  flowId: {
    type: String
  },
  contactId: {
    type: String
  },
  contactNumber: {
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
