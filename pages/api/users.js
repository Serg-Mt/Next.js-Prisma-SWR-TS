// это серверный код для EdgeRuntime


import { getAllUsers } from '../../db/db_wrap';
import userColumns from '../../lib/userColumns';

function createUserFromFormData(data){
  let user = {}
  Object.keys(data).map(key=>userColumns.find((name)=>key===name).setVal((user,data[key])));
  return user;
}

// console.log('___',globalThis?.EdgeRuntime,typeof EdgeRuntime);

export default async function handler(req, res) {

  console.log('>> ',req.method,' запрос на', req.url);
  try {
    let users = await getAllUsers();
    res.status(200).json(users);

  } catch(error) {
    console.log(__filename, error);
    res.status(500).send({error})
  }

}