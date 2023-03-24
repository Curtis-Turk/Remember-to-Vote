import { mockRequestResponse } from "./apiSetup";
import postcode from "../../pages/api/postcode";
import axios, { AxiosError } from "axios";
import pollingDataExistsResponse from "./mockApiResponses/pollingDataExistsResponse";
jest.mock("axios");
const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios>;

describe("/postcode api route", () => {
  it("verifies the postcode", async () => {
    const postcodeRequest = { postcode: "TN4TWH" };
    mockedAxiosGet.mockResolvedValueOnce({ data: pollingDataExistsResponse });
    const { req, res } = mockRequestResponse("POST");
    req.headers = {
      origin: process.env.NEXT_PUBLIC_API,
    };
    req.body = postcodeRequest;
    await postcode(req, res);
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      `https://api.electoralcommission.org.uk/api/v1/postcode/TN4TWH?token=${process.env.EC_API_KEY}`
    );
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      pollingStationFound: true,
      pollingStations: [],
    });
  });
});
