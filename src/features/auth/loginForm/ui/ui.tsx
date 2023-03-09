import { Form, Input, Button, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getIsLoading } from '../model/selectors/getIsLoading';
import { login } from '../model/services/login';

const { Title } = Typography;

export interface FormValues {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getIsLoading);
  const navigate = useNavigate();

  const handleSubmit = async (formValues: FormValues) => {
    const result = await dispatch(login(formValues));

    if (result.meta.requestStatus === 'fulfilled') {
      navigate(RoutePath.leagues);
    }
  };

  return (
    <Form onFinish={handleSubmit} style={{ width: '400px' }}>
      <Form.Item style={{ textAlign: 'center' }}>
        <Title level={4}>Авторизация</Title>
      </Form.Item>
      <Form.Item name='username' rules={[{ required: true, message: 'Введите ваш логин' }]}>
        <Input placeholder='Введите логин' />
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true, message: 'Введите ваш пароль' }]}>
        <Input.Password placeholder='Введите пароль' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
