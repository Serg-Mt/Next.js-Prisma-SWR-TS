import {Email} from './cell-wrappers';

const userColumns = [
  { name: 'Name', getVal: obj => obj.name, setVal: (obj, val) => Object.assign(obj, { name: val }) },
  { name: 'Login', getVal: obj => obj.username, setVal: (obj, val) => Object.assign(obj, { username: val }) },
  { name: 'Email', getVal: obj => obj.email, setVal: (obj, val) => Object.assign(obj, { email: val }), wrap: Email },
  { name: 'Address city', getVal: obj => obj.address?.city, setVal: (obj, val) => Object.assign(obj, ({ address: Object.assign(obj?.address||{}, { city: val }) })) },
];

export default userColumns;