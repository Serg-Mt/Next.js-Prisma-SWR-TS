// это серверный код для EdgeRuntime

import { addNewUser } from '../../db/db_wrap';

import userColumns from '../../lib/userColumns';


function createUserFromFormData(data) {
  const user = { id: Math.trunc(1e7 * Math.random()) };
  Object.keys(data).map(key => userColumns.find(({ name }) => key === name).setVal(user, data[key]));
  console.log('user', user);
  return user;
}


const defaultUser= {
  name:'',
  username:'',
  email:'',
  phone:'',
  website:'',
  company:{name:'',catchPhrase:'',bs:''},
  address:{street:'',suite:'',city:'',zipcode:''}
};

export default async function handler(req, res) {
  console.log('>> ', req.method, ' запрос на', req.url);
  console.log(req.body);
  // console.log(req.headers);
  try {
    const { referer } = req.headers;
    await addNewUser(Object.assign({}, defaultUser, createUserFromFormData(req.body)));
    if (referer) {
      console.log('referer', referer);
      res.redirect(302, referer);
      return;
    }
    res.status(200).send('ok');

  } catch (error) {
    console.log(__filename, error);
    res.status(500).send({ error });
  }


}

