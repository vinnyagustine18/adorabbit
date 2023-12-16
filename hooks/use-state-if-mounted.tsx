import React from 'react';

export default function useStateIfMounted<T>(
  initialValue: T | (() => T),
): [T, (value: T) => void] {
  const isMounted = React.useRef(false);
  const [state, setState] = React.useState(initialValue);

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const newSetState = React.useCallback(
    (value: T) => {
      if (isMounted.current) {
        setState(value);
      }
    },
    [isMounted],
  );
  return [state, newSetState];
}
