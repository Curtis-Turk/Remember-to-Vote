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
  const smsReqBody = { ...reqBody, addressSlug: '', messageType: 'Sms' };
  mockedTwilioApi.sendSmsMessage.mockResolvedValue(true);
  mockedTwilioApi.sendWhatsAppMessage.mockResolvedValue(true);
  mockedSupabase.submitToVotersTable.mockResolvedValue(successfulSupabaseResponse);

  it('status 201 when an Sms message is succesfully sent and supabase row inserted', async () => {
    const { req, res } = mockRequestResponse('POST');
    req.body = smsReqBody;
    await submit(req, res);
    expect(mockedTwilioApi.sendSmsMessage).toHaveBeenCalledWith(
      mockMessageBody(reqBody.name),
      '+447777777777'
    );
    expect(res.statusCode).toBe(201);
  });

  it('status 201 if a WhatsApp message is succesfully sent and supabase row inserted', async () => {
    const { req, res } = mockRequestResponse('POST');
    req.body = { ...reqBody, addressSlug: '', messageType: 'WhatsApp' };
    await submit(req, res);
    expect(mockedTwilioApi.sendWhatsAppMessage).toHaveBeenCalledWith(
      mockMessageBody(reqBody.name),
      '+447777777777'
    );
    expect(res.statusCode).toBe(201);
  });

  it('status 400 if Supabase returns an error code', async () => {
    const { req, res } = mockRequestResponse('POST');
    req.body = smsReqBody;
    mockedSupabase.submitToVotersTable.mockResolvedValueOnce({
      status: 400, // could be any number beginning with 4
      statusText: 'Conflict', // could be any status text
      error: { code: 'code', message: 'message', details: 'details', hint: 'hint' },
      data: null,
      count: null,
    });
    await submit(req, res);
    expect(res.statusCode).toBe(400);
  });

  it('status 409 if Supabase returns a unique conflict', async () => {
    const { req, res } = mockRequestResponse('POST');
    req.body = smsReqBody;
    mockedSupabase.submitToVotersTable.mockResolvedValueOnce({
      status: 409,
      statusText: 'Conflict',
      error: {
        code: '23505',
        details: 'Key (handle)=(saoirse) already exists.',
        hint: 'null', // is this null?? says string in types but null in docs??
        message: 'duplicate key value violates unique constraint "users_handle_key"',
      },
      data: null,
      count: null,
    });
    await submit(req, res);
    expect(res.statusCode).toBe(409);
  });
});

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
