import { NextApiRequest, NextApiResponse } from 'next';
import { submitToVotersTable } from '../../lib/supabase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const formData = {
    name: 'Bob',
    phone_number: '6876757657',
    postcode: 'N4W1T',
    address_slug: '1564363523',
    message_type: 'WhatsApp',
    created_at: new Date(),
  };
};
