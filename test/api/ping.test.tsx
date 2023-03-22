import ping from "../../pages/api/ping";
import { mockRequestResponse } from "./apiSetup";
// import { createRequest, createResponse, createMocks } from "node-mocks-http";
// import type { NextApiRequest, NextApiResponse } from "next";

// export type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
// export type APiResponse = NextApiResponse & ReturnType<typeof createResponse>;

describe("ping method", () => {
  it("pings", () => {
    // const { req, res } = createMocks<ApiRequest, APiResponse>({
    //   method: "GET",
    // });
    const { req, res } = mockRequestResponse();
    ping(req, res);
    expect(res._getData()).toEqual("Pong");
  });
});
