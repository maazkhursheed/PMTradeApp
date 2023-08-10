import { generateBase64Encoded } from "~root/Lib/QrCodeHelper/index";

test("Object should be converted into base64 encoded string", () => {
  expect(
    generateBase64Encoded({
      data: "any data",
      anotherData: "any other data",
    }),
  ).toEqual("YW55IGRhdGE=.YW55IG90aGVyIGRhdGE=");

  expect(generateBase64Encoded(undefined)).toEqual("");
});
