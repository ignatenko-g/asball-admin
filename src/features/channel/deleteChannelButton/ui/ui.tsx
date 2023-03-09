import { Button, Popconfirm } from 'antd';
import { deleteChannel } from 'entities/channel';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface DeleteChannelButtonProps {
  id: string;
}

export const DeleteChannelButton = ({ id }: DeleteChannelButtonProps) => {
  const dispatch = useAppDispatch();

  const handleConfirm = (id: string) => {
    dispatch(deleteChannel(id));
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
