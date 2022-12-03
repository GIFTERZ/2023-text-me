import React, { PropsWithChildren, useEffect, useState } from "react";

function DeferredComponent({ children }: PropsWithChildren) {
  const DEFERRED_TIME = 2000;

  const [isDeferred, setIsDeferred] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, DEFERRED_TIME);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <>{children}</>;
}

export default DeferredComponent;
