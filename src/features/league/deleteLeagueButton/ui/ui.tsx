import { FC } from 'react';
import { Button, Popconfirm } from 'antd';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteLeague } from 'entities/league';

interface DeleteLeagueButtonProps {
  id: string;
}

export const DeleteLeagueButton: FC<DeleteLeagueButtonProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  const handleConfirm = (id: string) => {
    dispatch(deleteLeague(id));
  };

  return (
    <Popconfirm
      title='Уверены, что хотите удалить?'
      okText='Ок'
      cancelText='Отменить'
      onConfirm={() => handleConfirm(id)}
    >
      <Button>Удалить</Button>
    </Popconfirm>
  );
};
