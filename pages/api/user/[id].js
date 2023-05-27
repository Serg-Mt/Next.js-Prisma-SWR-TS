import { deleteUser } from '../../../db/db_wrap';



export default async function handler(req, res) {
  const { id } = req.query;
  console.log('>> ',req.method,' запрос на', req.url, 'id=', id);
  switch  (req.method) {
    case 'DELETE':
      await deleteUser(+id);
      break;
  }
  res.status(200).send('ok');

}