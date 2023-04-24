import { expect } from '@jest/globals';
import sendElectionDayText from '../lib/sendElectionDayText';
import * as supabase from '../lib/supabase';
import * as TwilioApi from '../lib/twilioApi';
import electoralCommisionApi from '../lib/electoralCommisionApi';
import { mockAllUserResponse } from './mockResponses/supaBaseAllUserResponse';
import { mockECresponse } from './mockResponses/EcPollingStationResponse';

const mockMessageBody = (name: string, postcode: string, pollingStation: string) =>
  `Hello ${name},\n\n\🗳️ It's election day! 🗳️\n\nthe polling station for your postcode ${postcode} is:\n\n${pollingStation}\n\nRemember to bring your ID.`;

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

  it('Requests EC api for user when they have confirmation text', async () => {
    mockedSupabase.getAllUsers.mockResolvedValueOnce(mockAllUserResponse);

    const mockGetPollingStation = jest
      .spyOn(mockedECApi.prototype, 'getPollingStation')
      .mockResolvedValue(mockECresponse.dates[0].polling_station.station.properties);

    await sendElectionDayText();

    expect(mockGetPollingStation).toHaveBeenCalledWith({
      postcode: mockAllUserResponse.data[0].postcode,
      address_slug: '',
    });
    expect(mockGetPollingStation).not.toHaveBeenCalledWith({
      postcode: mockAllUserResponse.data[1].postcode,
      address_slug: '',
    });
    expect(mockGetPollingStation).toHaveBeenCalledWith({
      postcode: mockAllUserResponse.data[2].postcode,
      address_slug: mockAllUserResponse.data[2].address_slug,
    });
    mockGetPollingStation.mockRestore();
  });

  xit('sends correct message type to first mock user', async () => {
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
