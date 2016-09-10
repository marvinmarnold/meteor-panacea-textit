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
  }
});
