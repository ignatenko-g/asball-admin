import { Button, Popconfirm } from 'antd';
import { deleteMatch } from 'entities/match';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface DeleteMatchButtonProps {
  id: string;
}

export const DeleteMatchButton = ({ id }: DeleteMatchButtonProps) => {
  const dispatch = useAppDispatch();

  const handleConfirm = (id: string) => {
    dispatch(deleteMatch(id));
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
