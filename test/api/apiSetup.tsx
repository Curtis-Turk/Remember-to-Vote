import {
  createMocks,
  createRequest,
  createResponse,
  RequestMethod,
} from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>;

export const mockRequestResponse = (method: RequestMethod = "GET") => {
  const { req, res } = createMocks<ApiRequest, APiResponse>({
    method: "GET",
  });
  return { req, res };
};
