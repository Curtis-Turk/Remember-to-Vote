import { mockRequestResponse } from "./apiSetup";
import postcode from "../../pages/api/postcode";
import axios, { AxiosError } from "axios";

// mockApi Responses
import pollingDataExistsResponse from "./mockApiResponses/pollingDataExistsResponse";
import addressPickerResponse from "./mockApiResponses/addressPickerResponse";
import noUpcomingBallotsResponse from "./mockApiResponses/noUpcomingBallotsResponse";
import postcodeNotFound from "./mockApiResponses/postcodeNotFound";

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

  it("returns an address picker", async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: addressPickerResponse });
    const { req, res } = mockRequestResponse("POST");

    req.headers = {
      origin: process.env.NEXT_PUBLIC_API,
    };

    const postcodeRequest = { postcode: "TN4TWH" };
    req.body = postcodeRequest;

    await postcode(req, res);
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      `https://api.electoralcommission.org.uk/api/v1/postcode/TN4TWH?token=${process.env.EC_API_KEY}`
    );
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      pollingStationFound: false,
      pollingStations: [
        {
          address: "16 DUNCAN CLOSE, ST. MELLONS, CARDIFF",
          postcode: "CF3 1NP",
          slug: "100100106448",
        },
        {
          address: "26 DUNCAN CLOSE, ST. MELLONS, CARDIFF",
          postcode: "CF3 1NP",
          slug: "100100106458",
        },
      ],
    });
  });

  it("there are no upcoming ballots", async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: noUpcomingBallotsResponse });
    const { req, res } = mockRequestResponse("POST");

    req.headers = {
      origin: process.env.NEXT_PUBLIC_API,
    };

    const postcodeRequest = { postcode: "TN4TWH" };
    req.body = postcodeRequest;

    await postcode(req, res);

    expect(mockedAxiosGet).toHaveBeenCalledWith(
      `https://api.electoralcommission.org.uk/api/v1/postcode/TN4TWH?token=${process.env.EC_API_KEY}`
    );
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      pollingStationFound: false,
      pollingStations: [],
    });
  });

  it("Returns an error message if postcode not found", async () => {
    // axios will throw an error with status 400
    mockedAxiosGet.mockRejectedValue({
      response: {
        data: postcodeNotFound,
        status: 400,
      },
    });
    const { req, res } = mockRequestResponse("POST");

    req.headers = {
      origin: process.env.NEXT_PUBLIC_API,
    };

    const postcodeRequest = { postcode: "aaaaaa" };
    req.body = postcodeRequest;
    await postcode(req, res);
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      `https://api.electoralcommission.org.uk/api/v1/postcode/aaaaaa?token=${process.env.EC_API_KEY}`
    );
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({
      errorMessage: "Could not geocode from any source",
      pollingStationFound: false,
      pollingStations: [],
    });
  });

  it("returns an error message if axios couldn't connect", async () => {
    mockedAxiosGet.mockRejectedValue(new AxiosError());

    expect(mockedAxiosGet).toHaveBeenCalledWith(
      `https://api.electoralcommission.org.uk/api/v1/postcode/TN4TWH?token=${process.env.EC_API_KEY}`
    );

    const { req, res } = mockRequestResponse("POST");

    req.headers = {
      origin: process.env.NEXT_PUBLIC_API,
    };

    const postcodeRequest = { postcode: "aaaaaa" };
    req.body = postcodeRequest;

    await postcode(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({
      errorMessage: "Connection issue whilst verifying postcode",
      pollingStationFound: false,
      pollingStations: [],
    });
  });

  it("returns 400 if not the same origin", async () => {
    const postcodeRequest = { postcode: "TN4TWH" };
    const { req, res } = mockRequestResponse("POST");
    req.body = postcodeRequest;
    await postcode(req, res);
    expect(res.statusCode).toBe(400);
  });
});
