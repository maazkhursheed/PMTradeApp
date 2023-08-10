import * as React from "react";
import * as renderer from "react-test-renderer";
import FilterSwitchItem from "./FilterSwitchItem";

describe("Facets list item UI Testing", () => {
  // tslint:disable-next-line:no-empty
  const component = renderer.create(<FilterSwitchItem facet={[]} onFacetTapped={(queryStr: string) => {}} />).toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
