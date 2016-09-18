import { Meteor } from 'meteor/meteor'
import { Sms, SmsStatuses } from 'meteor/marvin:panacea-textit'

// Endpoint for status updates about MO status updates
// http:://some.thing.com/some.page/some.id&status=%d
const path = "/methods/" + Meteor.settings.SECRET_TOKEN + "/panacea-status-updates/:id"
JsonRoutes.add("get", path, (req, res, next) => {
  const status = req.query.status
  const smsId = req.params.id
  const sms = Sms.findOne(smsId)

  if(sms)
    SmsStatuses.insert({smsId, status})

  JsonRoutes.sendResult(res, {
    data: true
  });
});
