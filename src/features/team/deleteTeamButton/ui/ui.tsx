import { FC } from 'react';
import { Button, Popconfirm } from 'antd';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteTeam } from 'entities/team';

interface DeleteTeamButtonProps {
  id: string;
}

export const DeleteTeamButton: FC<DeleteTeamButtonProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  const handleConfirm = (id: string) => {
    dispatch(deleteTeam(id));
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
