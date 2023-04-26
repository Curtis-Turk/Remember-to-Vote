import ping from '../../pages/api/ping';
import { mockRequestResponse } from './apiSetup';
import { expect } from '@jest/globals';

describe('ping method', () => {
  it('pings', () => {
    const { req, res } = mockRequestResponse();
    ping(req, res);
    expect(res._getData()).toEqual('Pong');
  });
});
