import { LANGUAGES } from '../../lib/constants.js';


export default ChannelsSchema = new SimpleSchema({
  urn: {
    type: String
  },
  language: {
    type: String,
    allowedValues: _.values(LANGUAGES),
    optional: true
  },
  textItToken: {
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
