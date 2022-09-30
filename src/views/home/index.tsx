import { FC, useCallback, useEffect, useState } from 'react';
import { Comment, Form, Input, Button } from 'antd';
import { get$, post$ } from '../../shared/helpers';
import { finalize, tap } from 'rxjs';

const { TextArea } = Input;
const { Item } = Form;

const Editor = () => {

  const [loading, setLoading] = useState(false);

  const onFinish = useCallback((values: Record<string, string>) => {
    setLoading(true);
    post$('/comment/create', {
      content: values.content,
      belong: 'path/test',
    }).pipe(
      finalize(() => setLoading(false)),
    ).subscribe();
  }, []);

  return (
    <Form
      onFinish={onFinish}
    >
      <Item
        name={'content'}
      >
        <TextArea rows={4} />
      </Item>
      <Item>
        <Button htmlType="submit" loading={loading} type="primary">提交</Button>
      </Item>
    </Form>
  );
};

const Home: FC = () => {

  const getList = useCallback(() => {
    get$('/comment/list', { belong: 'path/test' }).pipe(
      tap(res => {
        console.log(res);
      }),
    ).subscribe();
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <div>
      <Comment
        content={
          <Editor />
        }
      />
    </div>
  );
};

export default Home;
