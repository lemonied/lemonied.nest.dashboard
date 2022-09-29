import { createStore } from './core';
import { Subject, switchMap } from 'rxjs';
import { get$ } from '../helpers';

interface UserInfo {
  avatar?: string;
  nick?: string;
  status: 'init' | 'pending' | 'unauthorized' | 'authorized';
}

export const userInfoStore = createStore<UserInfo>({
  status: 'init',
});

export const refreshUserInfo$ = new Subject<void>();

refreshUserInfo$.pipe(
  userInfoStore.map(() => ({ ...userInfoStore.state, status: 'pending' })),
  switchMap(user => get$('/auth/profile').pipe(
    userInfoStore.map(res => ({ ...user, status: 'authorized', nick: res.nick, avatar: res.avatar })),
  )),
  userInfoStore.capture((err, user) => ({ ...user, status: 'unauthorized' })),
).subscribe();
