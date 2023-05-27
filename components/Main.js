import swr from 'swr';

import userColumns from '../lib/userColumns';

import ItemTR from './ItemTR';
import Spinner from './Spinner';
import css from './Main.module.sass';
import { useRef, useState } from 'react';

const fetcher = url => fetch(url).then(r => r.json())


console.log('Друзья, мы с вами в ', typeof navigator !== 'undefined' ? navigator.userAgent : '', typeof process != 'undefined' ? 'Node ' + process?.version : '');
console.log('и только сегодня swr=', swr); // а если без мата? -  то он промолчал 
const useSWR = swr?.default || swr; // и поэтому вот так




export default function Main() {
  const [inputsVal, setInputsVal] = useState(Array(userColumns.length).fill(''));
  const formRef = useRef(null);

  const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher);
  console.log('Main render ', { data, error, isLoading });

  if (error) return <div className='error'>ошибка загрузки</div>;
  if (isLoading) return <Spinner />;

  return <>
    <form ref={formRef} method="post" action="/api/adduser" onSubmit={evt => '111' !== inputsVal[0] && evt.preventDefault()}>
      <table className={css.main}>
        <thead>
          <tr>
            {userColumns.map(el => <th key={el.name}>{el.name}</th>)}
            <th></th>
          </tr>

        </thead>
        <tbody>

          {data.map(user =>
            <tr key={user.id} title={'user.id=' + user.id}>
              <ItemTR obj={user} columnList={userColumns} />
              <td>
                <button onClick={async () => {
                  let response = await fetch('/api/user/'+user.id, {
                    method: 'DELETE'
                  });
                  console.log('response',response);
                }}>
                  x</button>
              </td>
            </tr>)}
        </tbody>
        <tbody>
          <tr>
            {userColumns.map((el, i) => <td key={el.name}>
              <input type="text" name={el.name} value={inputsVal[i]} onInput={evt => setInputsVal(inputsVal.with(i, evt.target.value))} />
            </td>)}
            <td>
              <button type="submit" onClick={async () => {
                try {
                  let formData = new URLSearchParams(new FormData(formRef.current));
                  // console.log('FormData:',[...formData.keys()] );
                  let response = await fetch('/api/adduser', {
                    method: 'POST',
                    body: formData
                  });
                  console.log('fetch response', response);
                  setInputsVal([...inputsVal.fill('')]);
                } catch (error) {

                } finally {

                }
              }
              }>
                Отправить
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </form>
  </>
}