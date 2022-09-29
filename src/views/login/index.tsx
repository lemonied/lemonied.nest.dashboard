import { FC, useCallback, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { post$ } from '../../shared/helpers';
import { catchError, tap, throwError } from 'rxjs';
import { useNavigate } from 'react-router-dom';
import { refreshUserInfo$ } from '../../shared/stores/user-info';

const { Item } = Form;

const Login: FC = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerSuperAdmin = useCallback((values: Record<string, string>) => {
    setLoading(true);
    post$('/user/init', {
      identifier: values.email,
      password: values.password,
    }).pipe(
      tap(() => {
        refreshUserInfo$.next();
        navigate('/');
      }),
      catchError((err) => {
        setLoading(false);
        return throwError(() => err);
      }),
    ).subscribe();
  }, [navigate]);

  const onFinish = useCallback((values: Record<string, string>) => {
    registerSuperAdmin(values);
  }, [registerSuperAdmin]);

  return (
    <Form
      onFinish={onFinish}
    >
      <Item
        name={'email'}
        label={'邮箱'}
        rules={[
          {
            required: true,
            message: '请输入邮箱',
          },
        ]}
      >
        <Input placeholder={'请输入邮箱'} />
      </Item>
      <Item
        name={'password'}
        label={'密码'}
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      >
        <Input.Password placeholder={'请输入密码'} />
      </Item>
      <Item>
        <Button loading={loading} type="primary" htmlType="submit" block>提交</Button>
      </Item>
    </Form>
  );
};

export default Login;
