import * as React from "react";
import * as renderer from "react-test-renderer";
import CheckBox from "./CheckBox";

describe("CheckBox UI Testing", () => {
  const component = renderer.create(<CheckBox />).toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
