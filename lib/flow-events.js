import FlowHistories from '../collections/flow-histories.js'
import Contacts from '../collections/contacts.js'
import { findOrNewContact } from './sms.js'

export const insertFlowEvent = (urn, flowId, flowEvent) => {
  const flowHistory = FlowHistories.findOne({contactNumber: urn, flowId}, {sort: {createdAt: -1}})
  const flowHistoryId

  if(!flowHistory) {
    const contact = findOrNewContact(urn)

    flowHistoryId = FlowHistories.insert({
      contactNumber: urn,
      flowId,
      contactId: contact._id
    })
  } else {
    flowHistoryId = flowHistory._id
  }

  return FlowEvents.insert(_.extend(flowEvent, { flowHistoryId }))
}
