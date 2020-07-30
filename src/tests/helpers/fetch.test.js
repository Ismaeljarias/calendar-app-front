import { fetchNoToken, fetchWithToken } from "../../helpers/fetch";
import "@testing-library/jest-dom";

describe("Test on Fetch helper", () => {
  let token = "";

  test("FetchNoToken should work", async () => {
    const resp = await fetchNoToken(
      "auth",
      { email: "ismaeljarias@gmail.com", password: "123456" },
      "POST"
    );

    expect(resp instanceof Response).toBe(true);

    const body = await resp.json();
    expect(body.ok).toBe(true);

    token = body.token;
  });

  test("FetchWithToken should work", async () => {
    localStorage.setItem("token", token);

    const resp = await fetchWithToken(
      "events/5f20d31189a6370017e9e353",
      {},
      "DELETE"
    );
    const body = await resp.json();

    expect(body.msg).toBe("The event does not exist");
  });
});
