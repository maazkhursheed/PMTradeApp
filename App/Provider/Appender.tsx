import * as R from "ramda";
import React, { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import OutageContainer from "~root/Containers/OutageContainer/OutageContainer";
import { RootState } from "~root/Reducers";

interface IAppendContex {
  remove: (id: string) => void;
  append: (element: any, id: string, sort?: number) => void;
  clear: () => void | undefined;
}

export const AppendContext = createContext<IAppendContex>({} as any);

/**
 * A hook that screens can use to gain access to our appender, with
 * `const { append, clear } = useAppender()`,
 * or less likely: `const appender = useAppender()`
 */
export const useAppender = () => useContext(AppendContext);

export const withAppender = (ReactComponent: any) => {
  return (props: any) => {
    const [elements, setElements] = useState({} as any);
    return (
      <AppendContext.Provider
        value={{
          /**
           * @param element React node to attach in the React Component
           * @param id Id to assign when using this
           * @param sort Sort number, Views will be re-arranged according to the sort number
           *
           * Always use this function inside the useEffect hook to update the props in this component
           */
          append: (element: any, id: string, sort?: number) => setElements(R.assoc(id, { element, sort: sort || 0 }, elements)),
          remove: id => setElements(R.omit([id], elements)),
          clear: () => setElements([]),
        }}
      >
        <>
          <ReactComponent {...props} />
          {R.compose(R.map(R.prop("element")), R.sortBy(R.prop("sort")), R.values)(elements)}
        </>
      </AppendContext.Provider>
    );
  };
};

const SafeContainer = ({ screenKey, children }: any) => {
  const screensStatus = useSelector((state: RootState) => state?.appDetail?.screensStatus);

  if (R.path([screenKey, "isNotWorking"], screensStatus)) {
    return <OutageContainer screensStatus={screensStatus[screenKey]} />;
  }
  return <>{children}</>;
};

export const safeRender = (ReactComponent: any, screenKey: string) => {
  return (props: any) => {
    return (
      <SafeContainer screenKey={screenKey}>
        <ReactComponent {...props} />
      </SafeContainer>
    );
  };
};
