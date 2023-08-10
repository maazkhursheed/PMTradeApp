import * as React from "react";
import * as renderer from "react-test-renderer";
import InstructionsSwitchSheet from "./InstructionsSwitchSheet";

describe("Instructions switch sheet UI Testing", () => {
  const component = renderer.create(<InstructionsSwitchSheet />).toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
