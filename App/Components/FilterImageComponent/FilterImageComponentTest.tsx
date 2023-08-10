import * as React from "react";
import * as renderer from "react-test-renderer";
import FilterImageComponent from "./FilterImageComponent";

describe("Filter image component UI Testing", () => {
  const component = renderer.create(<FilterImageComponent item={{}} onFacetTap={(query: string) => {}} />).toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
