import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { Buffer } from "safe-buffer";

/**
 * transforms js object values to base64 encoded string with dot separation
 * example {data: "any data", anotherData: "any other data"} => YW55IGRhdGE=.YW55IG90aGVyIGRhdGE=
 *
 * @param any - JS Object
 * @return string - base64 endoded string
 */

export const generateBase64Encoded = R.compose(
  R.join("."),
  R.map(R.compose(R.invoker(1, "toString")("base64"), Buffer.from)),
  R.filter(RA.isNotNilOrEmpty),
  R.values,
);
