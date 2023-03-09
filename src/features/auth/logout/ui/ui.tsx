import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { sessionActions } from 'entities/session';
import { RoutePath } from 'shared/config/routeConfig';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(sessionActions.setIsAuth(false));
    localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
    navigate(RoutePath.signin);
  };

  return <Button onClick={handleLogout}>Выйти</Button>;
};
