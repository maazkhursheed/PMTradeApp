import * as renderer from "react-test-renderer";
import { ERROR_503_ELEMENT, ERROR_GENERIC_ELEMENT } from "~root/Lib/AlertsHelper/index";

test("Renders ERROR_GENERIC_ELEMENT snapshot as expected", () => {
  const tree = renderer.create(ERROR_GENERIC_ELEMENT).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Renders ERROR_503_ELEMENT snapshot as expected", () => {
  const tree = renderer.create(ERROR_503_ELEMENT).toJSON();
  expect(tree).toMatchSnapshot();
});
