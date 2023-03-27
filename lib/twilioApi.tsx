interface createParams {
  body: string;
  to: string;
  from?: string;
  messagingServiceSid?: string;
}

import { Twilio } from "twilio";

export default class TwilioApi {
  fromNumberWhatsapp: string;
  accountSid: string;
  authToken: string;
  messagingServiceSid: string;
  client: Twilio;

  constructor(
    accountSid: string,
    authToken: string,
    fromNumberWhatsapp: string,
    messagingServiceSid: string
  ) {
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.fromNumberWhatsapp = fromNumberWhatsapp;
    this.messagingServiceSid = messagingServiceSid;
    this.client = new Twilio(accountSid, authToken);
  }

  /* sends a message using the Twilio API and module
  Args: [createParams: object]
  If a message is unsucessful the twilio module will throw an error, otherwise it will return an object
  See here for response object examples: https://www.twilio.com/docs/usage/twilios-response */
  async sendMessage(createParams: createParams): Promise<boolean> {
    const message = await this.client.messages.create(createParams);
    console.log(`Message sent! SID: ${message.sid}`);
    return true;
  }

  /* both these functions send a message to a chosen number
  Args: [body: string, toNumber: string]
  return value: bool, true if message sent succesfully, throws an error if not
  toNumber must be prefixed with an international dialling code and no 0, eg. UK = 0798... => +44798... */
  public async sendWhatsAppMessage(
    body: string,
    toNumber: string
  ): Promise<boolean> {
    return await this.sendMessage({
      body,
      from: `whatsapp:${this.fromNumberWhatsapp}`,
      to: `whatsapp:${toNumber}`,
    });
  }

  public async sendSmsMessage(
    body: string,
    toNumber: string
  ): Promise<boolean> {
    return await this.sendMessage({
      body,
      messagingServiceSid: this.messagingServiceSid,
      to: `${toNumber}`,
    });
  }
}
