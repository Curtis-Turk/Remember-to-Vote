import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.query;

  if (key === 'harryfox123') {
    res.status(200).send('SHOTS FIRED! With key ' + key);
  } else res.status(401).send('Your key:\n' + key + '\nis not correct');
}
