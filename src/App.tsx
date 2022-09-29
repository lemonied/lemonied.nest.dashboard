import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { refreshUserInfo$ } from './shared/stores/user-info';

function App() {

  useEffect(() => {
    refreshUserInfo$.next();
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
