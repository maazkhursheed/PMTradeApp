// a library to wrap and simplify api calls
import { ApisauceInstance, create as apicreate } from "apisauce";
import { from } from "rxjs";
import AppConfig from "~root/Config/AppConfig";
import { AddressValidationAPI } from "./Api";

// our "constructor"
export default (): AddressValidationAPI => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //

  let api: ApisauceInstance | undefined = undefined;
  const getApi = () => {
    if (api) {
      return api;
    }
    api = apicreate({
      // base URL is read from the "constructor"
      baseURL: AppConfig.CORE_LOGIC_ENDPOINT,
      // here are some default headers
      headers: {
        "Cache-Control": "no-cache",
      },
      // 20 second timeout...
      timeout: 20000,
    });
    return api;
  };

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const getAddressSuggestions = (text: string) =>
    from(
      getApi().get("/suggest", {
        text,
        maxSuggestions: "5",
        f: "pjson",
        countryCode: "nz",
      }),
    );

  const getGeoCode = (address: string) =>
    from(
      getApi().get("/geocodeAddresses", {
        f: "json",
        sourceCountry: "nz",
        addresses: `{"records":[{"attributes":{"Address":"${address}",}}]}`,
        outSR: `{"wkid": 4326}`,
      }),
    );

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list o   f the API functions from step 2
    getAddressSuggestions,
    getGeoCode,
  };
};
