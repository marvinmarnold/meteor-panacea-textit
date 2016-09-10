export default FlowsSchema = new SimpleSchema({
  name: {
    type: String,
  }
  triggers: {
    type: [String]
  },
  textItId: {
    type: String
  }
});
