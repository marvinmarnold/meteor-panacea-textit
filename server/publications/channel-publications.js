import { Channels } from '../../common/collections/channels.js';

Meteor.publish("channels.all", () => {
  return Channels.find();
});
