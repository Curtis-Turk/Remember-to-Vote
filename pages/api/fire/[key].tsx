import { NextApiRequest, NextApiResponse } from 'next';

import sendElectionDayText, { sendElectionDayTextTest } from '../../../lib/sendElectionDayText';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.query;

  if (key == process.env.FIRE_TEST) {
    sendElectionDayTextTest();
    res.status(200).send('TEST FIRED! With key ' + key);
  }
}
