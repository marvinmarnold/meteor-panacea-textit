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
  }
});
