import { splitAndMergeSearchSuggestion } from "~root/Lib/SearchSuggestion";

test("String splitter and merger should work as expected", () => {
  expect(splitAndMergeSearchSuggestion({ isCategory: false, name: "This is a test string", value: "This is a test string" }, "test")).toEqual([
    { text: "this is a ", isMatch: false },
    { text: "test", isMatch: true },
    { text: " string", isMatch: false },
  ]);

  expect(
    splitAndMergeSearchSuggestion(
      { isCategory: false, name: "This is a test string which needs more testing", value: "This is a test string which needs more testing" },
      "test",
    ),
  ).toEqual([
    { text: "this is a ", isMatch: false },
    { text: "test", isMatch: true },
    { text: " string which needs more ", isMatch: false },
    { text: "test", isMatch: true },
    { text: "ing", isMatch: false },
  ]);

  expect(splitAndMergeSearchSuggestion({ isCategory: false, name: "This is a test string", value: "This is a test string" }, "")).toEqual([
    { text: "this is a test string", isMatch: false },
  ]);

  expect(splitAndMergeSearchSuggestion({ isCategory: false, name: "", value: "" }, "nothing")).toEqual([{ text: "", isMatch: false }]);
});
