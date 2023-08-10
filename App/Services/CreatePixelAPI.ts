// a library to wrap and simplify api calls
import { ApisauceInstance, create as apicreate } from "apisauce";
import { from } from "rxjs";
import AppConfig from "~root/Config/AppConfig";
import { PixelAPI } from "~root/Services/Api";

// our "constructor"
export default (): PixelAPI => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //

  let apiPixel: ApisauceInstance | undefined = undefined;
  const getApiPixel = () => {
    if (apiPixel) {
      return apiPixel;
    }
    apiPixel = apicreate({
      baseURL: AppConfig.PIXEL_ENDPOINT,
      timeout: 20000,
    });
    return apiPixel;
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

  const logEvent = (params: any) => {
    params.acct_id = AppConfig.PIXEL_PIXEL_ACCOUNT_ID;
    params.rand = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    Object.keys(params).map(key => {
      params[key] = encodeURI(params[key]);
    });

    return from(getApiPixel().get("", params));
  };

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
    // a list of the API functions from step 2
    logEvent,
  };
};
