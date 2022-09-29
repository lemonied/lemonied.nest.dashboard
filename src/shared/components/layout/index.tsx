import { FC, ReactNode } from 'react';
import { Header } from '../header';
import styles from './styles.module.scss';

interface LayoutProps {
  children?: ReactNode;
}
const Layout: FC<LayoutProps> = (props) => {

  const { children } = props;

  return (
    <section className={styles['layout']}>
      <Header />
      <main className={styles['main']}>{ children }</main>
    </section>
  );
};

export { Layout };
