import { Button, Form, Input, Modal } from 'antd';
import { FC, useState } from 'react';
import { createLeague, League, updateLeague } from 'entities/league';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface AddEditLeagueButtonProps {
  league?: League;
}

interface FormValues {
  name: string;
}

export const AddEditLeagueButton: FC<AddEditLeagueButtonProps> = ({ league }) => {
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const isAddMode = !league;

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
      dispatch(createLeague(formValues)).finally(hideModalResetFields);
    } else {
      const formValuesForUpdate = {
        id: league.id,
        ...formValues,
      };

      dispatch(updateLeague(formValuesForUpdate)).finally(hideModalResetFields);
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
        title={isAddMode ? 'Добавить лигу' : 'Редактировать лигу'}
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
        <Form onFinish={handleSubmit} initialValues={league} form={form}>
          <Form.Item name='name' rules={[{ required: true, message: 'Введите название!' }]}>
            <Input placeholder='Введите название' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
