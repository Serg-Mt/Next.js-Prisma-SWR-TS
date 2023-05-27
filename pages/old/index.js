import { SWRConfig } from 'swr';

import Main from '../../components/Main';

export async function getStaticProps() {
  // `getStaticProps` выполняется на стороне сервера.
  // const users = await getArticleFromAPI()
  return {
    props: {
      fallback: {
        '/api/users': []
      }
    }
  };
}

export default function HomePage({ fallback }) {
  return <SWRConfig value={{ fallback }}>
    <h1>Таблица пользователей</h1>
    <Main />
  </SWRConfig>;
}