import * as React from "react";
import * as renderer from "react-test-renderer";
import FilterNameComponent from "./FilterNameComponent";

describe("Filter name component UI Testing", () => {
  // tslint:disable-next-line:no-empty
  const component = renderer.create(<FilterNameComponent item={{}} onFacetTap={(query: string) => {}} />).toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
