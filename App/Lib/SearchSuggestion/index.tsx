import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { debounceTime, distinctUntilChanged, filter, tap } from "rxjs/operators";

export interface ISuggestionTextObject {
  text: string;
  isMatch: boolean;
}

/**
 * @param string - The string on which action is to be perform
 * @param match - The matching string which needs to be splitted
 * @return return array of object
 * [{text: string, isMatch: boolean}]
 */
// @ts-ignore
export const splitAndMergeSearchSuggestion = R.curry((suggestion: any, match: string): ISuggestionTextObject[] =>
  R.compose(
    R.dropLast(1),
    // @ts-ignore
    R.reduce((acc, elem) => R.compose(R.append({ text: match.toLowerCase(), isMatch: true }), R.append(elem))(acc), []),
    R.map(R.applySpec({ text: R.identity, isMatch: R.F })),
    R.ifElse(R.always(RA.isNilOrEmpty(match)), R.always([suggestion.name?.toLowerCase()]), R.split(match.toLowerCase())),
  )(suggestion.name?.toLowerCase()),
);

export const splitAndMergeSearchCategory = R.curry((suggestion: any, match: string): ISuggestionTextObject[] => {
  return [
    {
      text: suggestion.name || "",
      isMatch: suggestion.name?.toLowerCase().includes(match.toLowerCase()),
    },
  ];
});

export const subscribeSuggestions = (suggestions$, props) => {
  suggestions$
    .pipe(
      tap(value => props.setTerm(value)),
      debounceTime(300),
      distinctUntilChanged(),
      filter(R.compose(R.gte(R.__, 3), R.length)),
    )
    .subscribe(props.searchSuggestions);
};
