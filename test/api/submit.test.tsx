import { mockRequestResponse } from "./apiSetup";
import submit from "../../pages/api/submit";
import TwilioApi from "../../lib/twilioApi";

const mockSendMessage = jest.fn();
jest.mock("../../lib/twilioApi", () => {
  return jest.fn().mockImplementation(() => {
    return {
      sendMessage: () => mockSendMessage(),
    };
  });
});

describe("/submit api route", () => {
  it("returns 201 for a message successfully sent", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = {
      name: "Curtis Turk",
      phone: "+447777777777",
      postcode: "ST7 2AE",
      messageType: "WhatsApp",
      addressSlug: "",
    };
    mockSendMessage.mockResolvedValue("Message sent");
    await submit(req, res);
    expect(res.statusCode).toBe(200);
  });
});
