// это серверный код для EdgeRuntime

import { addNewUser } from '../../db/db_wrap';

import { createUserFromFormData } from '../../lib/userColumns';



export default async function handler(req, res) {
  console.log('>> ', req.method, ' запрос на', req.url);
  console.log(req.body);
  // console.log(req.headers);
  try {
    // const { referer } = req.headers;
    const newUser = await addNewUser(createUserFromFormData(req.body));
    // if (referer) {
    //   console.log('referer', referer);
    //   res.redirect(302, referer);
    //   return;
    // }
    res.status(200).json(newUser);

  } catch (error) {
    console.log(__filename, error);
    res.status(500).send({ error });
  }


}

