import { FC, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { Channel, createChannel, updateChannel } from 'entities/channel';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface AddEditChannelButtonProps {
  channel?: Channel;
}

interface FormValues {
  name: string;
  link: string;
}

export const AddEditChannelButton: FC<AddEditChannelButtonProps> = ({ channel }) => {
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const isAddMode = !channel;

  const showModal = () => {
    setOpenModal(true);
  };

  const hideModal = () => {
    setOpenModal(false);
  };

  const hideModalResetFields = () => {
    hideModal();
    form.resetFields();
  };

  const handleSubmit = (formValues: FormValues) => {
    if (isAddMode) {
      dispatch(createChannel(formValues)).finally(hideModalResetFields);
    } else {
      const formValuesForUpdate = {
        id: channel.id,
        ...formValues,
      };

      dispatch(updateChannel(formValuesForUpdate)).finally(hideModalResetFields);
    }
  };

  return (
    <>
      <Button type='primary' style={{ marginBottom: isAddMode ? 16 : 0 }} onClick={showModal}>
        {isAddMode ? 'Создать' : 'Редактировать'}
      </Button>
      <Modal
        cancelText='Отменить'
        okText='Ок'
        title={isAddMode ? 'Добавить телеканал' : 'Редактировать телеканал'}
        centered
        onCancel={hideModalResetFields}
        open={openModal}
        onOk={form.submit}
        footer={[
          <Button key='back' onClick={hideModalResetFields}>
            Отменить
          </Button>,
          <Button key='submit' type='primary' onClick={form.submit}>
            Подтвердить
          </Button>,
        ]}
      >
        <Form onFinish={handleSubmit} initialValues={channel} form={form}>
          <Form.Item name='name' rules={[{ required: true, message: 'Введите название!' }]}>
            <Input placeholder='Введите название' />
          </Form.Item>
          <Form.Item name='link' rules={[{ required: true, message: 'Введите ссылку!' }]}>
            <Input placeholder='Введите ссылку' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
