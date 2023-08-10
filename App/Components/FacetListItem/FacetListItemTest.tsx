import * as React from "react";
import * as renderer from "react-test-renderer";
import FacetListItem from "./FacetListItem";

describe("Facets list item UI Testing", () => {
  const component = renderer.create(<FacetListItem item={{}} index={0} resetTapped={() => {}} onPress={(filterName: string) => {}} />).toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
