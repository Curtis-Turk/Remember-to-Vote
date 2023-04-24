// get all users from database
// Loop over users
//   check confirmation text sent
//      if true
//          check address slug
// if true
// use EC address slug endpoint
// else
// use EC postcode endpoint
// add returned polling station to message
// message user with name, postcode & polling station in correct message type

// return returns a list of error codes with user Ids
//

import { getAllUsers } from './supabase';

export default async function sendElectionDayText() {
  const users = await getAllUsers();

  return users;
}
