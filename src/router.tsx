import { createBrowserRouter, LoaderFunction, Outlet, redirect } from 'react-router-dom';
import { AsyncLoad } from './shared/components/async-load';
import { userInfoStore } from './shared/stores/user-info';
import { firstValueFrom, skipWhile } from 'rxjs';
import { Layout } from './shared/components/layout';

const loader: LoaderFunction = async () => {
  const state = await firstValueFrom(
    userInfoStore.state$.pipe(
      skipWhile(v => v.status === 'pending' || v.status === 'init'),
    ),
  );
  if (state.status === 'unauthorized') {
    return redirect('/login');
  }
  if (state.status === 'authorized') {
    return state;
  }
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: '',
        element: <AsyncLoad load={() => import('./views/home')} />,
        loader,
      },
      {
        path: 'login',
        element: <AsyncLoad load={() => import('./views/login')} />,
      },
    ],
  },
], {
  basename: process.env.PUBLIC_URL,
});
