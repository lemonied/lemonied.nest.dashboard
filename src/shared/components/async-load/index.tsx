import { FC, FunctionComponent, useEffect, useState } from 'react';
import { from, tap } from 'rxjs';
import NProgress from 'nprogress';

NProgress.configure({
  showSpinner: false,
});

type ComponentLike = FunctionComponent;

interface AsyncLoadProps {
  load: () => Promise<{ default: ComponentLike }>
}
export const AsyncLoad: FC<AsyncLoadProps> = (props) => {
  const { load } = props;

  const [ComponentRef, setComponentRef] = useState<{ Component: ComponentLike } | null>(null);

  useEffect(() => {
    NProgress.start();
    const subscription = from(load()).pipe(
      tap(res => {
        NProgress.done();
        setComponentRef({
          Component: res.default,
        });
      }),
    ).subscribe();
    return () => {
      NProgress.remove();
      subscription.unsubscribe();
    };
  }, [load]);

  if (ComponentRef) {
    return <ComponentRef.Component />;
  }

  return null;
};
