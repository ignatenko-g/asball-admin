import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, Row, Menu, MenuProps } from 'antd';
import { getIsAuth } from 'entities/session';
import { LogoutButton } from 'features/auth/logout';
import { RoutePath } from 'shared/config/routeConfig';

const { Header, Content, Sider } = Layout;

const siderMenuItems: MenuProps['items'] = [
  {
    key: RoutePath.leagues,
    label: <Link to={RoutePath.leagues}>Лиги</Link>,
  },
  {
    key: RoutePath.teams,
    label: <Link to={RoutePath.teams}>Команды</Link>,
  },
  {
    key: RoutePath.channels,
    label: <Link to={RoutePath.channels}>Телеканалы</Link>,
  },
  {
    key: RoutePath.matches,
    label: <Link to={RoutePath.matches}>Матчи</Link>,
  },
];

export const MyLayout = () => {
  const isAuth = useSelector(getIsAuth);
  const path = useLocation().pathname;

  if (isAuth) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Row style={{ height: '100%' }} align='middle' justify={'end'}>
            <LogoutButton />
          </Row>
        </Header>
        <Layout>
          <Sider style={{ minHeight: '100vh' }}>
            <Menu items={siderMenuItems} selectedKeys={[path]} theme='dark' />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              style={{
                padding: 24,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content
        style={{
          padding: 24,
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};
