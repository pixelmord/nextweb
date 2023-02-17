'use client';

import { useEffect, useRef, useState } from 'react';

export default function IntegrationSync() {
  const [cursor, setCursor] = useState('');
  const didMount = useRef(false);
  useEffect(() => {
    const sync = async (nextCursor) => {
      const res = await fetch('/api/integration-sync', {
        method: 'POST',
        body: JSON.stringify({ cursor: nextCursor }),
      });
      const data = await res.json();
      if (data.hasNextPage) {
        setCursor(data.endCursor);
      }
    };
    if (didMount.current) {
      sync(cursor);
    } else {
      didMount.current = true;
    }
  }, [cursor]);
  return null;
}
