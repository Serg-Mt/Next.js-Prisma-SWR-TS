import {Email} from './cell-wrappers';

const userColumns = [
  { name: 'Name', getVal: obj => obj.name, setVal: (obj, val) => Object.assign(obj, { name: val }) },
  { name: 'Login', getVal: obj => obj.username, setVal: (obj, val) => Object.assign(obj, { username: val }) },
  { name: 'Email', getVal: obj => obj.email, setVal: (obj, val) => Object.assign(obj, { email: val }), wrap: Email },
  { name: 'Address city', getVal: obj => obj.address?.city, setVal: (obj, val) => Object.assign(obj, ({ address: Object.assign(obj?.address||{}, { city: val }) })) },
];

export default userColumns;

const defaultUser= {
  name:'',
  username:'',
  email:'',
  phone:'',
  website:'',
  company:{name:'',catchPhrase:'',bs:''},
  address:{street:'',suite:'',city:'',zipcode:''}
};

export function createUserFromFormData(data) {
  const user = { id: Math.trunc(1e7 * Math.random()) };
  Object.keys(data).map(key => userColumns.find(({ name }) => key === name).setVal(user, data[key]));
  // console.log('user', user);
  return Object.assign({}, defaultUser, user );
}
