import { mockRequestResponse } from "./apiSetup";
import submit from "../../pages/api/submit";
import supabase from "../../utils/supabase";
jest.mock("../../utils/supabase");

describe("/submit api route", () => {
  it("returns 401 if not the same origin", async () => {
    const { req, res } = mockRequestResponse("POST");
    req.body = {
      name: "Curtis Turk",
      phone: "+447777777777",
      postcode: "ST7 2AE",
      messageType: "WhatsApp",
      addressSlug: "",
    };
    await submit(req, res);
    expect(res.statusCode).toBe(401);
  });
});
