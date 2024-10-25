import { PropsWithChildren, useEffect, useState } from 'react';
import { worker } from '../mock/browser';

export function MswProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const startMockServer = async () => {
      await worker.start();
      setIsReady(true);
    };

    startMockServer();
  }, []);

  // msw 서버가 준비되기 전에는 로딩 상태를 보여줌
  if (!isReady) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
