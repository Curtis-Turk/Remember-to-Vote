import { expect } from '@jest/globals';
import sendElectionDayText from '../lib/sendElectionDayText';
import * as supabase from '../lib/supabase';
import * as TwilioApi from '../lib/twilioApi';
import electoralCommisionApi from '../lib/electoralCommisionApi';
import { mockAllUserResponse } from './mockResponses/supaBaseAllUserResponse';
import { mockECresponse } from './mockResponses/EcPollingStationResponse';
import { addressObject } from '../src/components/Postcode';

const mockMessageBody = (name: string, postcode: string, pollingStation: addressObject) =>
  `Hello ${name}, the polling station for your postcode ${postcode} is:\n\n${pollingStation} `;

jest.mock('../lib/twilioApi');
jest.mock('../lib/supabase');
jest.mock('../lib/electoralCommisionApi');

const mockedTwilioApi = TwilioApi as jest.Mocked<typeof TwilioApi>;
const mockedECApi = electoralCommisionApi as jest.Mocked<typeof electoralCommisionApi>;
const mockedSupabase = supabase as jest.Mocked<typeof supabase>;

describe('SendElectionDayText', () => {
  it('Can get an array of all users', async () => {
    mockedSupabase.getAllUsers.mockResolvedValueOnce(mockAllUserResponse);
    await sendElectionDayText();
    expect(mockedSupabase.getAllUsers).toHaveBeenCalled();
  });

  it('Requests EC api for user when they have confirmation text and have no address slug', async () => {
    mockedSupabase.getAllUsers.mockResolvedValueOnce(mockAllUserResponse);

    const mockGetPollingStation = jest
      .spyOn(mockedECApi.prototype, 'getPollingStation')
      .mockResolvedValue('Earlswood Social Club, 160-164 Greenway Road, Rumney');

    await sendElectionDayText();

    expect(mockGetPollingStation).toHaveBeenCalledWith({
      postcode: mockAllUserResponse.data[0].postcode,
      address_slug: '',
    });
    expect(mockGetPollingStation).not.toHaveBeenCalledWith({
      postcode: mockAllUserResponse.data[1].postcode,
      address_slug: '',
    });
    mockGetPollingStation.mockRestore();
  });

  it('Requests EC api for user when they have confirmation text and have address slug', async () => {
    mockedSupabase.getAllUsers.mockResolvedValueOnce(mockAllUserResponse);

    const mockGetPollingStation = jest
      .spyOn(mockedECApi.prototype, 'getPollingStation')
      .mockResolvedValue('Earlswood Social Club, 160-164 Greenway Road, Rumney');

    await sendElectionDayText();
    expect(mockGetPollingStation).toHaveBeenCalledWith({
      postcode: mockAllUserResponse.data[2].postcode,
      address_slug: mockAllUserResponse.data[2].address_slug,
    });
    expect(mockGetPollingStation).not.toHaveBeenCalledWith({
      postcode: mockAllUserResponse.data[1].postcode,
      address_slug: mockAllUserResponse.data[1].address_slug,
    });
  });

  xit('sends correct message type to a single sign-up', async () => {
    mockedSupabase.getAllUsers.mockResolvedValueOnce(mockAllUserResponse);
    await sendElectionDayText();
    // expect(mockedTwilioApi.sendSmsMessage).toHaveBeenCalledWith(mockMessageBody(mockAllUserResponse.data[0].name,mockAllUserResponse.data[0].postcode, ));
  });
  xit('sends correct messages to whole db', () => {});
});

// jest.mock('../../utils/supabaseClient', () => ({
//   __esModule: true,
//   supabase: {
//     rpc: jest.fn(),
//   },
// }));

// const rpcMock = jest.requireMock('../../utils/supabaseClient').supabase.rpc;
// rpcMock.mockReturnValue({
//   data: mockResultData,
// });
