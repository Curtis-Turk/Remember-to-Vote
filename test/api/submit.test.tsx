import { mockRequestResponse } from "./apiSetup";
import submit from "../../pages/api/submit";
import TwilioApi from "../../lib/twilioApi";

jest.mock("../../lib/twilioApi");

describe("/submit api route", () => {
  let mockedApi: jest.Mocked<TwilioApi>;
  const successfulBody =
    "Hi Curtis Turk,\n\nIt's election day! Your polling station:\n\nEarlswood Social Club,\n160-164 Greenway Road,\nRumney\n\nRemember to bring your ID";

  beforeEach(() => {
    mockedApi = jest.mocked(TwilioApi).mock
      .instances[0] as jest.Mocked<TwilioApi>;
  });

  it("returns 201 for an Sms message successfully sent", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = {
      name: "Curtis Turk",
      phone: "+447777777777",
      postcode: "ST7 2AE",
      messageType: "Sms",
      addressSlug: "",
    };
    mockedApi.sendSmsMessage.mockResolvedValueOnce(true);
    await submit(req, res);
    expect(mockedApi.sendSmsMessage).toHaveBeenCalledWith(
      successfulBody,
      "+447777777777"
    );
    expect(res.statusCode).toBe(201);
  });

  it("returns 201 for a WhatsApp message successfully sent", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = {
      name: "Curtis Turk",
      phone: "+447777777777",
      postcode: "ST7 2AE",
      messageType: "WhatsApp",
      addressSlug: "",
    };
    mockedApi.sendWhatsAppMessage.mockResolvedValueOnce(true);
    await submit(req, res);
    expect(mockedApi.sendWhatsAppMessage).toHaveBeenCalledWith(
      successfulBody,
      "+447777777777"
    );
    expect(res.statusCode).toBe(201);
  });
});
