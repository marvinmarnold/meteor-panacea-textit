# panacea-textit
Meteor server to relay messages between Panacea Mobile and TextIt.in.

Panacea is a WASP that provides SMS, USSD, IVR, and LBS network connectivity around the world.

TextIt is a SaaS provider that makes it easy to setup SMS and IVR campaigns through an interactive flow editor. It does not currently provide support for Panacea as a messaging channel.

panacea-textit is the glue that makes the two services inter-operable. It only supports SMS and LBS for now.

## Usage
````
meteor add marvin:panacea-textit
````

Copy `example_settings.json` to your project and fill in values.
You do not have to deploy to Galaxy but your life will be easier if you do.

TODO: instructions on configuring TextIt

TODO: instructions on configuring Panacea

Done.

## Concepts
### Contacts
An end-user that interacts with your system.

- **urn:** string representation of phone number.

### SMS
A message sent to a contact or received from a contact.


- **type:** incoming or outgoing
- **channel_id:**
- **contact_id:**
- **text:** body of the message_send


### Channels
Representation of the path a SMS took to reach the system. This is basically a phone number

- **urn:** string representation of phone number
- **language:** optional string of language this channel is for. In some use cases, it is desirable to have one language per channel.

To setup a channel:

- Go to textit.in
- Click on your username in the upper right hand to take you to Account Settings
- Click 'Add Channel' -> select API channel
- The send URL should be in the form GET  https://HOST/methods/SECRET_TOKEN/textit-to-panacea?from={{from}}&text={{text}}&to={{to}}&from_no_plus={{from_no_plus}}&to_no_plus={{to_no_plus}}&id={{id}}

## Endpoints
Once installed, your application will now have the following endpoints. Each endpoint is relative to `/methods/SECRET_TOKEN` (e.g. `example.com/methods/SECRET_TOKEN/endpoint`)

### panacea-to-textit
Receive SMS from Panacea and forward it to TextIt.

**Arguments:**

- **to:** URN
- **from:** URN
- **content:**

### textit-to-panacea
https://www.panaceamobile.com/developers/sending-sms/#message_send

**Arguments:**

- **username:** string
- **password:** string
- **to:** string, URN
- **text:** string, the body of your message
- **from:** string, URN
- **report_mask:** int, Delivery report request bitmask (see delivery_report_mask_* variables)
- **report_url:** string, URL to call when delivery status changes
- **charset:** sting, Character set to use (defaults to UTF-8)
- **data_coding:** int, Data coding (see data_coding_*)
- **message_class:** int, Message class
- **auto_detect_encoding:** int, Auto detect the encoding and send appropriately (useful for sending arabic, hindi, unicode etc messages) 1 = on, 0 = off, defaults off.

### panacea-status-updates
**Arguments:**

- **status:** String name of new status state.
