'use client';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

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
      if (+data.total > 0) {
        toast.success(`Synced ${data.total} integrations`);
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
