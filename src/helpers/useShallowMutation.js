import { useState } from "react";


function useShallowMutation(initialObj) {
  const [value, setValue] = useState(initialObj);

  const wrappedSetValue = function(callback) {
    setValue(obj => {
      const copiedObj = {...obj};
      callback(copiedObj);
      return copiedObj;
    });
  }

  return [value, wrappedSetValue];
}

export default useShallowMutation;