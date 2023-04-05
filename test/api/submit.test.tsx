import submit, { sendConfirmationText, submitToSupabase } from '../../pages/api/submit';
import * as supabase from '../../lib/supabase';
import * as TwilioApi from '../../lib/twilioApi';
import { mockRequestResponse } from './apiSetup';
const mockMessageBody = (name: string) =>
  `Hello ${name}, You have been signed up to RememberToVote.org.uk \n\n If you think this was in error, reply 'STOP' and we won't text you again.`;
jest.mock('../../lib/twilioApi');
jest.mock('../../lib/supabase');
const mockedTwilioApi = TwilioApi as jest.Mocked<typeof TwilioApi>;
const mockedSupabase = supabase as jest.Mocked<typeof supabase>;

// mocking system time as 1st March 2023
const mockedDateNow = new Date('2023-03-01');
jest.useFakeTimers().setSystemTime(mockedDateNow);

describe('/submit sendConfirmationText method', () => {
  it('returns true for an Sms message successfully sent', async () => {
    const name = 'Curtis';
    const phone = '+447777777777';
    const messageType = 'Sms';
    mockedTwilioApi.sendSmsMessage.mockResolvedValueOnce(true);
    const result = await sendConfirmationText(name, phone, messageType);
    expect(mockedTwilioApi.sendSmsMessage).toHaveBeenCalledWith(
      mockMessageBody(name),
      '+447777777777'
    );
    expect(result).toBe(true);
  });
});
const successfulSupabaseResponse = {
  status: 201,
  statusText: 'Created',
  error: null,
  data: null,
  count: null,
};
describe('/submit submitToSupabase method', () => {
  it('returns a response object when submitted to Supabase', async () => {
    const name = 'Curtis';
    const phone_number = '+447777777777';
    const message_type = 'Sms';
    const address_slug = '';
    const postcode = 'W11 A11';
    mockedSupabase.submitToVotersTable.mockResolvedValueOnce(successfulSupabaseResponse);
    const result = await submitToSupabase(name, phone_number, message_type, address_slug, postcode);
    expect(mockedSupabase.submitToVotersTable).toHaveBeenCalledWith({
      name,
      phone_number,
      message_type,
      address_slug,
      postcode,
      created_at: mockedDateNow,
    });
    expect(result).toBe(successfulSupabaseResponse);
  });
});

describe('/submit API route', () => {
  const reqBody = {
    name: 'Curtis Turk',
    phone: '+447777777777',
    postcode: 'ST7 2AE',
  };

  it('status 201 when an Sms message is succesfully sent and supabase row inserted', async () => {
    const { req, res } = mockRequestResponse('POST');
    req.body = { ...reqBody, addressSlug: '', messageType: 'Sms' };
    mockedTwilioApi.sendSmsMessage.mockResolvedValueOnce(true);
    mockedSupabase.submitToVotersTable.mockResolvedValueOnce(successfulSupabaseResponse);
    await submit(req, res);
    expect(mockedTwilioApi.sendSmsMessage).toHaveBeenCalledWith(
      mockMessageBody(reqBody.name),
      '+447777777777'
    );
    expect(res.statusCode).toBe(201);
  });
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
// });
