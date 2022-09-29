import { FC } from 'react';
import styles from './styles.module.scss';

const Header: FC = () => {
  return (
    <header className={styles['header']}>
      <nav>
        <div className={styles['nav-list']}>
          <span>Header</span>
        </div>
      </nav>
    </header>
  );
};

export { Header };
