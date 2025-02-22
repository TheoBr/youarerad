import { supabase } from '../../components/utils/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Partnership } from '@/types/api-schema'

export default async function sendVolunteer(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, partnertype, company, message } = req.body
  // TODO replace with real autogenerated type
  let { data, error } = await supabase.from<Partnership>('partnership').insert({
    email,
    partnertype,
    name,
    company,
    message,
  })
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ user: data })
}
