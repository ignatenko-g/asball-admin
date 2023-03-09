import { Row } from 'antd';
import { LoginForm } from 'features/auth/loginForm';

const SignInPage = () => {
  return (
    <Row align={'middle'} justify='center' style={{ minHeight: '100vh' }}>
      <LoginForm />
    </Row>
  );
};

export default SignInPage;
