import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const cors = Cors({
  origin: '*',
  methods: ['GET'],
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  const { key } = req.query;

  if (key === 'harryfox') {
    res.status(200).send('SHOTS FIRED! With key ' + key);
  } else res.status(401).send('key does not match\n' + key);
}
