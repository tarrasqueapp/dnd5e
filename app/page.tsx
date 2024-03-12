import { Typography } from '@mui/material';

export default async function RootPage() {
  const root = await fetch(`${process.env.HOST}/api`).then((res) => res.json());

  console.log(root);

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
