import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.query;
  if (key === 'harryfox') {
    res.status(200).send('SHOTS FIRED! With key ' + key);
  } else res.status(401).send('key does not match\n' + key);
}
