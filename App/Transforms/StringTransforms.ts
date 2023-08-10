import * as R from "ramda";

export const fetchLineAddress = R.compose(R.join(","), R.dropLast(2), R.split(","));
