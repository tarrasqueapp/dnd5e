'use client';

import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function RootPage() {
  const [root, setRoot] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchRoot() {
      const root = await fetch(`${process.env.HOST}/api`).then((res) => res.json());
      setRoot(root);
      console.log(root);
    }
    fetchRoot();
  }, []);

  return (
    <div>
      <Typography variant="h3">Root Page</Typography>
      <ul>
        {Object.keys(root).map((item) => (
          <li key={item}>{root[item]}</li>
        ))}
      </ul>
    </div>
  );
}
