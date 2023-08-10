import * as React from "react";
import * as renderer from "react-test-renderer";
import { Card, CardSectionHeader } from "~root/Components/Card";

describe("Card UI Testing", () => {
  const component = renderer.create(<Card />).toJSON();
  const componentCardHeader = renderer.create(<CardSectionHeader text={"Dummy Text"} />).toJSON();

  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
    expect(componentCardHeader).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
