import ping from '../../pages/api/ping';
import { mockRequestResponse } from './apiSetup';

describe('ping method', () => {
  it('pings', () => {
    const { req, res } = mockRequestResponse();
    ping(req, res);
    expect(res._getData()).toEqual('Pong');
  });
});
