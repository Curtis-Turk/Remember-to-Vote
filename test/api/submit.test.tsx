import { mockRequestResponse } from './apiSetup';
import submit, { sendConfirmationText } from '../../pages/api/submit';
import TwilioApi from '../../lib/twilioApi';
// import { jest } from '@jest/globals';
// const submitFunctions = { createMessageBody };

jest.mock('../../lib/twilioApi');

const mockMessageBody = `Hello Curtis Turk, You have been signed up to RememberToVote.org.uk \n\n If you think this was in error, reply 'STOP' and we won't text you again.`;
// const mockCreateMessageBody = jest
//   .spyOn(submitFunctions, 'createMessageBody')
//   .mockReturnValue(mockMessageBody);

describe('/submit sendConfirmationText method', () => {
  let mockedApi: jest.Mocked<TwilioApi>;

  beforeEach(() => {
    mockedApi = jest.mocked(TwilioApi).mock.instances[0] as jest.Mocked<TwilioApi>;
  });

  it('returns true for an Sms message successfully sent', async () => {
    const name = 'Curtis Turk';
    const phone = '+447777777777';
    const messageType = 'Sms';
    mockedApi.sendSmsMessage.mockResolvedValueOnce(true);
    const result = await sendConfirmationText(name, phone, messageType);
    // expect(mockCreateMessageBody).toHaveBeenCalledWith(name);
    expect(mockedApi.sendSmsMessage).toHaveBeenCalledWith(mockMessageBody, '+447777777777');
    expect(result).toBe(true);
  });

  // xit('returns 201 for a WhatsApp message successfully sent', async () => {
  //   const { req, res } = mockRequestResponse('POST');
  //   req.body = {
  //     name: 'Curtis Turk',
  //     phone: '+447777777777',
  //     postcode: 'ST7 2AE',
  //     messageType: 'WhatsApp',
  //     addressSlug: '',
  //   };
  //   mockedApi.sendWhatsAppMessage.mockResolvedValueOnce(true);
  //   await submit(req, res);
  //   expect(mockedApi.sendWhatsAppMessage).toHaveBeenCalledWith(mockMessageBody, '+447777777777');
  //   expect(res.statusCode).toBe(201);
  // });

  // xit('returns 400 if there is an issue sending with Twilio', async () => {
  //   const { req, res } = mockRequestResponse('POST');
  //   req.body = {
  //     name: 'Curtis Turk',
  //     phone: '+447777777777',
  //     postcode: 'ST7 2AE',
  //     messageType: 'WhatsApp',
  //     addressSlug: '',
  //   };
  //   mockedApi.sendWhatsAppMessage.mockResolvedValueOnce(false);
  //   await submit(req, res);
  //   expect(mockedApi.sendWhatsAppMessage).toHaveBeenCalledWith(successfulBody, '+447777777777');
  //   expect(res.statusCode).toBe(400);
  // });
});
